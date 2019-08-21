import {CadesBrowserPlugin} from "@delagen/cadesplugin";
import {CryptoProApiAsync, CryptoProApiSync, ICryptoProApi} from './src';

window.onload = () => {
	(<any>window).cadesplugin.then((plugin: CadesBrowserPlugin) => {
		let cryptoProApi: ICryptoProApi;
		if (plugin.isAsync) {
			cryptoProApi = new CryptoProApiAsync(plugin);
		} else {
			cryptoProApi = new CryptoProApiSync(plugin);
		}
		(<any>window).cryptoProApi = Object.assign(cryptoProApi, (<any>window).certificatesApi);
	});
};
