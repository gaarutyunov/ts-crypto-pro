import { IPrivateKey } from "../interfaces";
import { TranslatedInfo } from "./translated-info";
export declare class CertificateAdjuster {
    private readonly _thumbprint;
    private readonly _subjectInfo;
    private readonly _issuerInfo;
    private readonly _privateKey;
    private readonly _validFrom;
    private readonly _validTo;
    private readonly _serialNumber;
    readonly thumbprint: string;
    readonly subjectInfo: string;
    readonly issuerInfo: string;
    readonly privateKey: IPrivateKey;
    readonly validFrom: Date;
    readonly validTo: Date;
    readonly serialNumber: string;
    readonly friendlySubjectInfo: TranslatedInfo[] | null;
    readonly friendlyIssuerInfo: TranslatedInfo[] | null;
    constructor(_thumbprint: string, _subjectInfo: string, _issuerInfo: string, _privateKey: IPrivateKey, _validFrom: Date, _validTo: Date, _serialNumber: string);
}
