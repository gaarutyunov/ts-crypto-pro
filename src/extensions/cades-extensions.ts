import {
	Async,
	CADESCOM_CADES_TYPE,
	CAPICOM_ENCODING_TYPE,
	ICadesSignedData,
	ICadesSignedDataAsync,
	ICertificate,
	ICPSigner
} from "@delagen/cadesplugin";
import {IPrivateKey} from "../interfaces";

export interface ICertificateExtended extends ICertificate {
	readonly PrivateKey: IPrivateKey;
}

export interface ICertificateExtendedAsync extends Async<ICertificateExtended> {
}

export interface ICadesSignedDataExtended extends ICadesSignedData {
	CoSignCades?(signer?: ICPSigner, CadesType?: CADESCOM_CADES_TYPE, EncodingType?: CAPICOM_ENCODING_TYPE): string;
}

export interface ICadesSignedDataExtendedAsync extends Async<ICadesSignedDataExtended>, ICadesSignedDataAsync {
}
