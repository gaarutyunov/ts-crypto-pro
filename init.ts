import {CadesBrowserPlugin} from "@delagen/cadesplugin";
import {CryptoProApi, CryptoProApiAsync, CryptoProApiSync} from './src';

window.onload = () => {
	(<any>window).cadesplugin.then((plugin: CadesBrowserPlugin) => {
		let cryptoProApi: CryptoProApi;
		if (plugin.isAsync) {
			cryptoProApi = new CryptoProApiAsync(plugin);
		} else {
			cryptoProApi = new CryptoProApiSync(plugin);
		}
		(<any>window).cryptoProApi = Object.assign(cryptoProApi, (<any>window).certificatesApi);
	});
};
