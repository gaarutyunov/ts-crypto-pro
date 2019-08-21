import { CadesMethods } from "./helpers/cades-methods";
import { IAbout } from "@delagen/cadesplugin";
import { CertificateAdjuster } from "./helpers";
import { ICertificateExtended } from "./extensions";
import { ICryptoProApi } from "./interfaces";
export declare class CryptoProApiSync extends CadesMethods implements ICryptoProApi {
    about(): IAbout;
    getCertsList(): CertificateAdjuster[];
    currentCadesCert(thumbprint: string): ICertificateExtended;
    getCert(thumbprint: string): CertificateAdjuster;
    signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): string;
}
