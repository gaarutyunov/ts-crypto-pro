import {CryptoProApiSync} from "./crypto-pro-api-sync";
import {CryptoProApiAsync} from "./crypto-pro-api-async";

export type CryptoProApi = CryptoProApiSync | CryptoProApiAsync;
