import { IObjectNamesMapAsync, IObjectNamesMapSync } from "@delagen/cadesplugin";
export declare type SyncOrAsyncMap = IObjectNamesMapSync | IObjectNamesMapAsync;
export declare type SyncOrAsyncMapValue<T extends keyof SyncOrAsyncMap> = IObjectNamesMapSync[T] | Promise<IObjectNamesMapAsync[T]>;
