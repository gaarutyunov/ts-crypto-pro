import {CadesMethods} from "./helpers/cades-methods";
import {
	CADESCOM_CADES_TYPE,
	CADESCOM_CONTENT_ENCODING_TYPE,
	CAPICOM_CERTIFICATE_FIND_TYPE, CAPICOM_PROPID,
	CAPICOM_STORE_LOCATION,
	CAPICOM_STORE_NAME,
	CAPICOM_STORE_OPEN_MODE,
	IAbout, ICertificates, ICPSigner, IStore,
} from "@delagen/cadesplugin";
import {CertificateAdjuster} from "./helpers";
import {ICadesSignedDataExtended, ICertificateExtended} from "./extensions";
import {ICryptoProApi} from "./interfaces";

export class CryptoProApiSync extends CadesMethods implements ICryptoProApi {
	public about(): IAbout {
		try {
			return this.oAbout() as IAbout;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public getCertsList(): CertificateAdjuster[] {
		try {
			const store: IStore = this.oStore() as IStore;
			store.Open(
				CAPICOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
				CAPICOM_STORE_NAME.CAPICOM_MY_STORE,
				CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
			);
			const certificates: ICertificates = store.Certificates;

			if (!certificates) {
				throw new Error("Нет доступных сертификатов");
			}

			const findCertificate: ICertificates = certificates.Find(CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
			const findCertsWithPrivateKey: ICertificates = findCertificate.Find(
				CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
				CAPICOM_PROPID.CAPICOM_PROPID_KEY_PROV_INFO
			);

			const count: number = findCertsWithPrivateKey.Count;

			if (!count) {
				throw new Error("Нет сертификатов с приватным ключом");
			}

			const countArray: Array<null> = Array(count).fill(null);

			store.Close();

			return countArray.map( (_, index: number) => {
				try {
					const cert: ICertificateExtended = findCertsWithPrivateKey.Item(index + 1) as ICertificateExtended;
					return new CertificateAdjuster(
						cert.Thumbprint,
						cert.SubjectName,
						cert.IssuerName,
						cert.PrivateKey,
						new Date(cert.ValidFromDate),
						new Date(cert.ValidToDate),
						cert.SerialNumber
					);
				} catch (e) {
					throw new Error(`При переборе сертификатов произошла ошибка: ${e.message}`)
				}
			});
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public  currentCadesCert(thumbprint: string): ICertificateExtended {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}
			const store: IStore = this.oStore() as IStore;
			store.Open(
				CAPICOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
				CAPICOM_STORE_NAME.CAPICOM_MY_STORE,
				CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
			);

			const certificates: ICertificates = store.Certificates;
			const count: number = certificates.Count;
			const findCertificate: ICertificates = certificates.Find(
				CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
				thumbprint
			);

			if (count) {
				const certificateItem: ICertificateExtended = findCertificate.Item(1) as ICertificateExtended;
				store.Close();

				return certificateItem;
			} else {
				throw new Error(`Произошла ошибка при получении cертификата по thumbprint значению: ${thumbprint}`);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public  getCert(thumbprint: string): CertificateAdjuster {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}

			const certList = this.getCertsList();

			for (let i = 0; i < certList.length; i++) {
				if (thumbprint === certList[i].thumbprint) {
					return certList[i];
				}
			}

			throw new Error(`Не найдено сертификата по thumbprint значению: ${thumbprint}`);
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public  signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): string {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}

			const currentCert: ICertificateExtended = this.currentCadesCert(thumbprint) as ICertificateExtended;
			const oSigner: ICPSigner = this.oSigner() as ICPSigner;
			oSigner.Certificate = currentCert;

			const oSignedData: ICadesSignedDataExtended = this.oSignedData() as ICadesSignedDataExtended;
			oSignedData.Content = base64;
			oSignedData.ContentEncoding = CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY;

			if (coSign) {
				oSignedData.VerifyCades(base64, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES);
				return oSignedData.CoSignCades(oSigner, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES);
			}

			return oSignedData.SignCades(oSigner, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES, bDetached);
		} catch (e) {
			throw new Error(e.message);
		}
	}
}

