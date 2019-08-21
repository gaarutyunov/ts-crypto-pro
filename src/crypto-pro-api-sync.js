import * as tslib_1 from "tslib";
import { CadesMethods } from "./helpers/cades-methods";
import { CertificateAdjuster } from "./helpers";
var CryptoProApiSync = /** @class */ (function (_super) {
    tslib_1.__extends(CryptoProApiSync, _super);
    function CryptoProApiSync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CryptoProApiSync.prototype.about = function () {
        try {
            return this.oAbout();
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    CryptoProApiSync.prototype.getCertsList = function () {
        try {
            var store = this.oStore();
            store.Open(2 /* CAPICOM_CURRENT_USER_STORE */, "My" /* CAPICOM_MY_STORE */, 2 /* CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED */);
            var certificates = store.Certificates;
            if (!certificates) {
                throw new Error("Нет доступных сертификатов");
            }
            var findCertificate = certificates.Find(9 /* CAPICOM_CERTIFICATE_FIND_TIME_VALID */);
            var findCertsWithPrivateKey_1 = findCertificate.Find(6 /* CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY */, 2 /* CAPICOM_PROPID_KEY_PROV_INFO */);
            var count = findCertsWithPrivateKey_1.Count;
            if (!count) {
                throw new Error("Нет сертификатов с приватным ключом");
            }
            var countArray = Array(count).fill(null);
            store.Close();
            return countArray.map(function (_, index) {
                try {
                    var cert = findCertsWithPrivateKey_1.Item(index + 1);
                    return new CertificateAdjuster(cert.Thumbprint, cert.SubjectName, cert.IssuerName, cert.PrivateKey, new Date(cert.ValidFromDate), new Date(cert.ValidToDate), cert.SerialNumber);
                }
                catch (e) {
                    throw new Error("\u041F\u0440\u0438 \u043F\u0435\u0440\u0435\u0431\u043E\u0440\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430: " + e.message);
                }
            });
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    CryptoProApiSync.prototype.currentCadesCert = function (thumbprint) {
        try {
            if (!thumbprint) {
                throw new Error("Не указано thumbprint значение сертификата");
            }
            var store = this.oStore();
            store.Open(2 /* CAPICOM_CURRENT_USER_STORE */, "My" /* CAPICOM_MY_STORE */, 2 /* CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED */);
            var certificates = store.Certificates;
            var count = certificates.Count;
            var findCertificate = certificates.Find(0 /* CAPICOM_CERTIFICATE_FIND_SHA1_HASH */, thumbprint);
            if (count) {
                var certificateItem = findCertificate.Item(1);
                store.Close();
                return certificateItem;
            }
            else {
                throw new Error("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 c\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u043F\u043E thumbprint \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E: " + thumbprint);
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    CryptoProApiSync.prototype.getCert = function (thumbprint) {
        try {
            if (!thumbprint) {
                throw new Error("Не указано thumbprint значение сертификата");
            }
            var certList = this.getCertsList();
            for (var i = 0; i < certList.length; i++) {
                if (thumbprint === certList[i].thumbprint) {
                    return certList[i];
                }
            }
            throw new Error("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u043F\u043E thumbprint \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E: " + thumbprint);
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    CryptoProApiSync.prototype.signBase64 = function (thumbprint, base64, bDetached, coSign) {
        try {
            if (!thumbprint) {
                throw new Error("Не указано thumbprint значение сертификата");
            }
            var currentCert = this.currentCadesCert(thumbprint);
            var oSigner = this.oSigner();
            oSigner.Certificate = currentCert;
            var oSignedData = this.oSignedData();
            oSignedData.Content = base64;
            oSignedData.ContentEncoding = 1 /* CADESCOM_BASE64_TO_BINARY */;
            if (coSign) {
                oSignedData.VerifyCades(base64, 1 /* CADESCOM_CADES_BES */);
                return oSignedData.CoSignCades(oSigner, 1 /* CADESCOM_CADES_BES */);
            }
            return oSignedData.SignCades(oSigner, 1 /* CADESCOM_CADES_BES */, bDetached);
        }
        catch (e) {
            throw new Error(e.message);
        }
    };
    return CryptoProApiSync;
}(CadesMethods));
export { CryptoProApiSync };
//# sourceMappingURL=crypto-pro-api-sync.js.map