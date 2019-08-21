var CadesMethods = /** @class */ (function () {
    function CadesMethods(_pluginObject) {
        this._pluginObject = _pluginObject;
    }
    CadesMethods.prototype.createObject = function (objName) {
        return this._pluginObject.isAsync ? this._pluginObject.CreateObjectAsync(objName) : this._pluginObject.CreateObject(objName);
    };
    CadesMethods.prototype.oStore = function () {
        return this.createObject("CAdESCOM.Store");
    };
    CadesMethods.prototype.oAttrs = function () {
        return this.createObject("CAdESCOM.CPAttribute");
    };
    CadesMethods.prototype.oSignedData = function () {
        return this.createObject("CAdESCOM.CadesSignedData");
    };
    CadesMethods.prototype.oSigner = function () {
        return this.createObject("CAdESCOM.CPSigner");
    };
    CadesMethods.prototype.oSignedXml = function () {
        return this.createObject("CAdESCOM.SignedXML");
    };
    CadesMethods.prototype.oAbout = function () {
        return this.createObject("CAdESCOM.About");
    };
    return CadesMethods;
}());
export { CadesMethods };
//# sourceMappingURL=cades-methods.js.map