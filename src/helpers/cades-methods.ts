import {CadesBrowserPlugin} from "@delagen/cadesplugin";
import {SyncOrAsyncMap, SyncOrAsyncMapValue} from "./index";

export class CadesMethods {
	public get isAsync(): boolean {
		return this._pluginObject.isAsync;
	}

	constructor(protected readonly _pluginObject: CadesBrowserPlugin) {
	}

	public createObject<T extends keyof SyncOrAsyncMap>(objName: T): SyncOrAsyncMapValue<T> {
		return this._pluginObject.isAsync ? this._pluginObject.CreateObjectAsync(objName) : this._pluginObject.CreateObject(objName);
	}

	public oStore(): SyncOrAsyncMapValue<"CAdESCOM.Store"> {
		return this.createObject<"CAdESCOM.Store">("CAdESCOM.Store");
	}

	public oAttrs(): SyncOrAsyncMapValue<"CAdESCOM.CPAttribute"> {
		return this.createObject<"CAdESCOM.CPAttribute">("CAdESCOM.CPAttribute");
	}

	public oSignedData(): SyncOrAsyncMapValue<"CAdESCOM.CadesSignedData"> {
		return this.createObject<"CAdESCOM.CadesSignedData">("CAdESCOM.CadesSignedData");
	}

	public oSigner(): SyncOrAsyncMapValue<"CAdESCOM.CPSigner"> {
		return this.createObject<"CAdESCOM.CPSigner">("CAdESCOM.CPSigner");
	}

	public oSignedXml(): SyncOrAsyncMapValue<"CAdESCOM.SignedXML"> {
		return this.createObject<"CAdESCOM.SignedXML">("CAdESCOM.SignedXML");
	}

	public oAbout(): SyncOrAsyncMapValue<"CAdESCOM.About"> {
		return this.createObject<"CAdESCOM.About">("CAdESCOM.About");
	}
}
