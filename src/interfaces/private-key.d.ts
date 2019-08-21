import { CAPICOM_PROV_TYPE } from "./capicom-prov-type";
import { CAPICOM_KEY_SPEC } from "./capicom-key-spec";
export interface IPrivateKey {
    readonly ContainerName: string;
    readonly KeySpec: CAPICOM_KEY_SPEC;
    readonly ProviderName: string;
    readonly ProviderType: CAPICOM_PROV_TYPE;
    readonly UniqueContainerName: string;
}
