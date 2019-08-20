import {IPrivateKey} from "../interfaces";
import {TranslatedInfo} from "./translated-info";
import {parseCertInfo} from "./parse-cert-info";
import {issuerTagTranslations, subjectTagTranslations} from "../constants";

export class CertificateAdjuster {

	get thumbprint(): string {
		return this._thumbprint;
	}

	get subjectInfo(): string {
		return this._subjectInfo;
	}

	get issuerInfo(): string {
		return this._issuerInfo;
	}

	get privateKey(): IPrivateKey {
		return this._privateKey;
	}

	get validFrom(): Date {
		return this._validFrom;
	}

	get validTo(): Date {
		return this._validTo;
	}

	get serialNumber(): string {
		return this._serialNumber;
	}

	get friendlySubjectInfo(): TranslatedInfo[] | null {
		return parseCertInfo(subjectTagTranslations, this._subjectInfo);
	}

	get friendlyIssuerInfo(): TranslatedInfo[] | null {
		return parseCertInfo(issuerTagTranslations, this._issuerInfo);
	}

	constructor(
		private readonly _thumbprint: string,
		private readonly _subjectInfo: string,
		private readonly _issuerInfo: string,
		private readonly _privateKey: IPrivateKey,
		private readonly _validFrom: Date,
		private readonly _validTo: Date,
		private readonly _serialNumber: string
	) {
	}
}
