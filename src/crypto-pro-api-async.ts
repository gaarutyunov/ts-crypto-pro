import {CadesMethods} from "./helpers/cades-methods";
import {CertificateAdjuster} from "./helpers";
import {
	CADESCOM_CADES_TYPE,
	CADESCOM_CONTENT_ENCODING_TYPE,
	CAPICOM_CERTIFICATE_FIND_TYPE, CAPICOM_PROPID,
	CAPICOM_STORE_LOCATION,
	CAPICOM_STORE_NAME,
	CAPICOM_STORE_OPEN_MODE, IAboutAsync,
	ICertificatesAsync, ICPSignerAsync,
	IStoreAsync
} from "@delagen/cadesplugin";
import {ICadesSignedDataExtendedAsync, ICertificateExtendedAsync} from "./extensions";

export class CryptoProApiAsync extends CadesMethods {
	public async about(): Promise<IAboutAsync> {
		try {
			return await this.oAbout() as IAboutAsync;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public async getCertsList(): Promise<CertificateAdjuster[]> {
		try {
			const store: IStoreAsync = await this.oStore() as IStoreAsync;
			await store.Open(
				CAPICOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
				CAPICOM_STORE_NAME.CAPICOM_MY_STORE,
				CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
			);
			const certificates: ICertificatesAsync = await store.Certificates;

			if (!certificates) {
				throw new Error("Нет доступных сертификатов");
			}

			const findCertificate: ICertificatesAsync = await certificates.Find(CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
			const findCertsWithPrivateKey: ICertificatesAsync = await findCertificate.Find(
				CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
				CAPICOM_PROPID.CAPICOM_PROPID_KEY_PROV_INFO
			);

			const count: number = await findCertsWithPrivateKey.Count;

			if (!count) {
				throw new Error("Нет сертификатов с приватным ключом");
			}

			const countArray: Array<null> = Array(count).fill(null);

			const certListPromise: CertificateAdjuster[] = await Promise.all<CertificateAdjuster>(
				countArray.map(async (_, index: number) => {
					try {
						const cert: ICertificateExtendedAsync = await findCertsWithPrivateKey.Item(index + 1) as ICertificateExtendedAsync;
						return new CertificateAdjuster(
							await cert.Thumbprint,
							await cert.SubjectName,
							await cert.IssuerName,
							await cert.PrivateKey,
							new Date(await cert.ValidFromDate),
							new Date(await cert.ValidToDate),
							await cert.SerialNumber
						);
					} catch (e) {
						throw new Error(`При переборе сертификатов произошла ошибка: ${e.message}`)
					}
				})
			);

			await store.Close();

			return certListPromise;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public async currentCadesCert(thumbprint: string): Promise<ICertificateExtendedAsync> {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}
			const store: IStoreAsync = await this.oStore() as IStoreAsync;
			await store.Open(
				CAPICOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
				CAPICOM_STORE_NAME.CAPICOM_MY_STORE,
				CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
			);

			const certificates: ICertificatesAsync = await store.Certificates;
			const count: number = await certificates.Count;
			const findCertificate: ICertificatesAsync = await certificates.Find(
				CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
				thumbprint
			);

			if (count) {
				const certificateItem: ICertificateExtendedAsync = await findCertificate.Item(1) as ICertificateExtendedAsync;
				await store.Close();

				return await certificateItem;
			} else {
				throw new Error(`Произошла ошибка при получении cертификата по thumbprint значению: ${thumbprint}`);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public async getCert(thumbprint: string): Promise<CertificateAdjuster> {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}

			const certList = await this.getCertsList();

			for (let i = 0; i < certList.length; i++) {
				if (thumbprint === certList[i].thumbprint) {
					return await certList[i];
				}
			}

			throw new Error(`Не найдено сертификата по thumbprint значению: ${thumbprint}`);
		} catch (e) {
			throw new Error(e.message);
		}
	}

	public async signBase64(thumbprint: string, base64: string, bDetached?: boolean, coSign?: boolean): Promise<string> {
		try {
			if (!thumbprint) {
				throw new Error("Не указано thumbprint значение сертификата");
			}

			const currentCert: ICertificateExtendedAsync = await this.currentCadesCert(thumbprint) as ICertificateExtendedAsync;
			const oSigner: ICPSignerAsync = await this.oSigner() as ICPSignerAsync;
			await oSigner.propset_Certificate(await currentCert);

			const oSignedData: ICadesSignedDataExtendedAsync = await this.oSignedData() as ICadesSignedDataExtendedAsync;
			await oSignedData.propset_Content(base64);
			await oSignedData.propset_ContentEncoding(CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY);

			if (coSign) {
				await oSignedData.VerifyCades(base64, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES);
				return await oSignedData.CoSignCades(await oSigner, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES);
			}

			return await oSignedData.SignCades(await oSigner, CADESCOM_CADES_TYPE.CADESCOM_CADES_BES, bDetached);
		} catch (e) {
			throw new Error(e.message);
		}
	}
}
