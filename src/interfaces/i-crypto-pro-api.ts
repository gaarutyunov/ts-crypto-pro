import {CertificateAdjuster, SyncOrAsyncMapValue} from "../helpers";
import {ICertificateExtended, ICertificateExtendedAsync} from '../extensions';

export interface ICryptoProApi {
	about(): SyncOrAsyncMapValue<"CAdESCOM.About">;
	getCertsList(): CertificateAdjuster[] | Promise<CertificateAdjuster[]>;
	currentCadesCert(thumbprint: string): ICertificateExtended | Promise<ICertificateExtendedAsync>;
	getCert(thumbprint: string): CertificateAdjuster | Promise<CertificateAdjuster>;
	signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): string | Promise<string>;
}
