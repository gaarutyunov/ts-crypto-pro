import { CadesMethods } from "./helpers/cades-methods";
import { CertificateAdjuster } from "./helpers";
import { IAboutAsync } from "@delagen/cadesplugin";
import { ICertificateExtendedAsync } from "./extensions";
import { ICryptoProApi } from "./interfaces";
export declare class CryptoProApiAsync extends CadesMethods implements ICryptoProApi {
    about(): Promise<IAboutAsync>;
    getCertsList(): Promise<CertificateAdjuster[]>;
    currentCadesCert(thumbprint: string): Promise<ICertificateExtendedAsync>;
    getCert(thumbprint: string): Promise<CertificateAdjuster>;
    signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): Promise<string>;
}
