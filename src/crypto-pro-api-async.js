import * as tslib_1 from "tslib";
import { CadesMethods } from "./helpers/cades-methods";
import { CertificateAdjuster } from "./helpers";
var CryptoProApiAsync = /** @class */ (function (_super) {
    tslib_1.__extends(CryptoProApiAsync, _super);
    function CryptoProApiAsync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CryptoProApiAsync.prototype.about = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.oAbout()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CryptoProApiAsync.prototype.getCertsList = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var store, certificates, findCertificate, findCertsWithPrivateKey_1, count, countArray, certListPromise, e_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.oStore()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.Open(2 /* CAPICOM_CURRENT_USER_STORE */, "My" /* CAPICOM_MY_STORE */, 2 /* CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, store.Certificates];
                    case 3:
                        certificates = _a.sent();
                        if (!certificates) {
                            throw new Error("Нет доступных сертификатов");
                        }
                        return [4 /*yield*/, certificates.Find(9 /* CAPICOM_CERTIFICATE_FIND_TIME_VALID */)];
                    case 4:
                        findCertificate = _a.sent();
                        return [4 /*yield*/, findCertificate.Find(6 /* CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY */, 2 /* CAPICOM_PROPID_KEY_PROV_INFO */)];
                    case 5:
                        findCertsWithPrivateKey_1 = _a.sent();
                        return [4 /*yield*/, findCertsWithPrivateKey_1.Count];
                    case 6:
                        count = _a.sent();
                        if (!count) {
                            throw new Error("Нет сертификатов с приватным ключом");
                        }
                        countArray = Array(count).fill(null);
                        return [4 /*yield*/, Promise.all(countArray.map(function (_, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var cert, _a, _b, _c, _d, e_3;
                                return tslib_1.__generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            _e.trys.push([0, 9, , 10]);
                                            return [4 /*yield*/, findCertsWithPrivateKey_1.Item(index + 1)];
                                        case 1:
                                            cert = _e.sent();
                                            _a = CertificateAdjuster.bind;
                                            return [4 /*yield*/, cert.Thumbprint];
                                        case 2:
                                            _b = [void 0, _e.sent()];
                                            return [4 /*yield*/, cert.SubjectName];
                                        case 3:
                                            _b = _b.concat([_e.sent()]);
                                            return [4 /*yield*/, cert.IssuerName];
                                        case 4:
                                            _b = _b.concat([_e.sent()]);
                                            return [4 /*yield*/, cert.PrivateKey];
                                        case 5:
                                            _b = _b.concat([_e.sent()]);
                                            _c = Date.bind;
                                            return [4 /*yield*/, cert.ValidFromDate];
                                        case 6:
                                            _b = _b.concat([new (_c.apply(Date, [void 0, _e.sent()]))()]);
                                            _d = Date.bind;
                                            return [4 /*yield*/, cert.ValidToDate];
                                        case 7:
                                            _b = _b.concat([new (_d.apply(Date, [void 0, _e.sent()]))()]);
                                            return [4 /*yield*/, cert.SerialNumber];
                                        case 8: return [2 /*return*/, new (_a.apply(CertificateAdjuster, _b.concat([_e.sent()])))()];
                                        case 9:
                                            e_3 = _e.sent();
                                            throw new Error("\u041F\u0440\u0438 \u043F\u0435\u0440\u0435\u0431\u043E\u0440\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430: " + e_3.message);
                                        case 10: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 7:
                        certListPromise = _a.sent();
                        return [4 /*yield*/, store.Close()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, certListPromise];
                    case 9:
                        e_2 = _a.sent();
                        throw new Error(e_2.message);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    CryptoProApiAsync.prototype.currentCadesCert = function (thumbprint) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var store, certificates, count, findCertificate, certificateItem, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        if (!thumbprint) {
                            throw new Error("Не указано thumbprint значение сертификата");
                        }
                        return [4 /*yield*/, this.oStore()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.Open(2 /* CAPICOM_CURRENT_USER_STORE */, "My" /* CAPICOM_MY_STORE */, 2 /* CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, store.Certificates];
                    case 3:
                        certificates = _a.sent();
                        return [4 /*yield*/, certificates.Count];
                    case 4:
                        count = _a.sent();
                        return [4 /*yield*/, certificates.Find(0 /* CAPICOM_CERTIFICATE_FIND_SHA1_HASH */, thumbprint)];
                    case 5:
                        findCertificate = _a.sent();
                        if (!count) return [3 /*break*/, 9];
                        return [4 /*yield*/, findCertificate.Item(1)];
                    case 6:
                        certificateItem = _a.sent();
                        return [4 /*yield*/, store.Close()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, certificateItem];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9: throw new Error("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 c\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u043F\u043E thumbprint \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E: " + thumbprint);
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_4 = _a.sent();
                        throw new Error(e_4.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    CryptoProApiAsync.prototype.getCert = function (thumbprint) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var certList, i, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!thumbprint) {
                            throw new Error("Не указано thumbprint значение сертификата");
                        }
                        return [4 /*yield*/, this.getCertsList()];
                    case 1:
                        certList = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < certList.length)) return [3 /*break*/, 5];
                        if (!(thumbprint === certList[i].thumbprint)) return [3 /*break*/, 4];
                        return [4 /*yield*/, certList[i]];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: throw new Error("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u043F\u043E thumbprint \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E: " + thumbprint);
                    case 6:
                        e_5 = _a.sent();
                        throw new Error(e_5.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CryptoProApiAsync.prototype.signBase64 = function (thumbprint, base64, bDetached, coSign) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentCert, oSigner, _a, _b, oSignedData, _c, _d, _e, _f, e_6;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 14, , 15]);
                        if (!thumbprint) {
                            throw new Error("Не указано thumbprint значение сертификата");
                        }
                        return [4 /*yield*/, this.currentCadesCert(thumbprint)];
                    case 1:
                        currentCert = _g.sent();
                        return [4 /*yield*/, this.oSigner()];
                    case 2:
                        oSigner = _g.sent();
                        _b = (_a = oSigner).propset_Certificate;
                        return [4 /*yield*/, currentCert];
                    case 3: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                    case 4:
                        _g.sent();
                        return [4 /*yield*/, this.oSignedData()];
                    case 5:
                        oSignedData = _g.sent();
                        return [4 /*yield*/, oSignedData.propset_Content(base64)];
                    case 6:
                        _g.sent();
                        return [4 /*yield*/, oSignedData.propset_ContentEncoding(1 /* CADESCOM_BASE64_TO_BINARY */)];
                    case 7:
                        _g.sent();
                        if (!coSign) return [3 /*break*/, 11];
                        return [4 /*yield*/, oSignedData.VerifyCades(base64, 1 /* CADESCOM_CADES_BES */)];
                    case 8:
                        _g.sent();
                        _d = (_c = oSignedData).CoSignCades;
                        return [4 /*yield*/, oSigner];
                    case 9: return [4 /*yield*/, _d.apply(_c, [_g.sent(), 1 /* CADESCOM_CADES_BES */])];
                    case 10: return [2 /*return*/, _g.sent()];
                    case 11:
                        _f = (_e = oSignedData).SignCades;
                        return [4 /*yield*/, oSigner];
                    case 12: return [4 /*yield*/, _f.apply(_e, [_g.sent(), 1 /* CADESCOM_CADES_BES */, bDetached])];
                    case 13: return [2 /*return*/, _g.sent()];
                    case 14:
                        e_6 = _g.sent();
                        throw new Error(e_6.message);
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return CryptoProApiAsync;
}(CadesMethods));
export { CryptoProApiAsync };
//# sourceMappingURL=crypto-pro-api-async.js.map