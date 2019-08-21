import { CadesBrowserPlugin } from "@delagen/cadesplugin";
import { SyncOrAsyncMap, SyncOrAsyncMapValue } from "./index";
export declare class CadesMethods {
    private readonly _pluginObject;
    constructor(_pluginObject: CadesBrowserPlugin);
    createObject<T extends keyof SyncOrAsyncMap>(objName: T): SyncOrAsyncMapValue<T>;
    oStore(): SyncOrAsyncMapValue<"CAdESCOM.Store">;
    oAttrs(): SyncOrAsyncMapValue<"CAdESCOM.CPAttribute">;
    oSignedData(): SyncOrAsyncMapValue<"CAdESCOM.CadesSignedData">;
    oSigner(): SyncOrAsyncMapValue<"CAdESCOM.CPSigner">;
    oSignedXml(): SyncOrAsyncMapValue<"CAdESCOM.SignedXML">;
    oAbout(): SyncOrAsyncMapValue<"CAdESCOM.About">;
}
