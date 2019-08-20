import {CadesBrowserPlugin} from "@delagen/cadesplugin";
import {CryptoProApi} from "./src";

window.onload = function () {
	(<any>window).cadesplugin.then(async (plugin: CadesBrowserPlugin) => {
		const certificatesApi: CryptoProApi = await new CryptoProApi(plugin);
		(<any>window).certificatesApi = Object.assign(certificatesApi, (<any>window).certificatesApi);
	});
};
