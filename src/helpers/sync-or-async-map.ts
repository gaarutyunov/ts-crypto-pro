import {IObjectNamesMapAsync, IObjectNamesMapSync} from "@delagen/cadesplugin";

export type SyncOrAsyncMap = IObjectNamesMapSync | IObjectNamesMapAsync;

export type SyncOrAsyncMapValue<T extends keyof SyncOrAsyncMap> = IObjectNamesMapSync[T] | Promise<IObjectNamesMapAsync[T]>;
