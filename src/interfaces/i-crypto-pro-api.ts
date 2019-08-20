import {SyncOrAsyncMapValue} from "../helpers";

export interface ICryptoProApi {
	about(): SyncOrAsyncMapValue<"CAdESCOM.About">;
}
