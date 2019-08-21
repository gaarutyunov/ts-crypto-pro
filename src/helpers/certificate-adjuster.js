import { parseCertInfo } from "./parse-cert-info";
import { issuerTagTranslations, subjectTagTranslations } from "../constants";
var CertificateAdjuster = /** @class */ (function () {
    function CertificateAdjuster(_thumbprint, _subjectInfo, _issuerInfo, _privateKey, _validFrom, _validTo, _serialNumber) {
        this._thumbprint = _thumbprint;
        this._subjectInfo = _subjectInfo;
        this._issuerInfo = _issuerInfo;
        this._privateKey = _privateKey;
        this._validFrom = _validFrom;
        this._validTo = _validTo;
        this._serialNumber = _serialNumber;
    }
    Object.defineProperty(CertificateAdjuster.prototype, "thumbprint", {
        get: function () {
            return this._thumbprint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "subjectInfo", {
        get: function () {
            return this._subjectInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "issuerInfo", {
        get: function () {
            return this._issuerInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "privateKey", {
        get: function () {
            return this._privateKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "validFrom", {
        get: function () {
            return this._validFrom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "validTo", {
        get: function () {
            return this._validTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "serialNumber", {
        get: function () {
            return this._serialNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "friendlySubjectInfo", {
        get: function () {
            return parseCertInfo(subjectTagTranslations, this._subjectInfo);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CertificateAdjuster.prototype, "friendlyIssuerInfo", {
        get: function () {
            return parseCertInfo(issuerTagTranslations, this._issuerInfo);
        },
        enumerable: true,
        configurable: true
    });
    return CertificateAdjuster;
}());
export { CertificateAdjuster };
//# sourceMappingURL=certificate-adjuster.js.map