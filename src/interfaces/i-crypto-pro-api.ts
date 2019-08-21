import {CertificateAdjuster} from "../helpers";
import {ICertificateExtended, ICertificateExtendedAsync} from "../extensions";
import {IAbout, IAboutAsync} from "@delagen/cadesplugin";

export interface ICryptoProApi {
	about(): IAbout | Promise<IAboutAsync>;
	getCertsList(): CertificateAdjuster[] | Promise<CertificateAdjuster[]>;
	currentCadesCert(thumbprint: string): ICertificateExtended | Promise<ICertificateExtendedAsync>;
	getCert(thumbprint: string): CertificateAdjuster | Promise<CertificateAdjuster>;
	signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): string | Promise<string>;
}
