import { CryptoProApiAsync, CryptoProApiSync } from './src';
window.onload = function () {
    window.cadesplugin.then(function (plugin) {
        var cryptoProApi;
        if (plugin.isAsync) {
            cryptoProApi = new CryptoProApiAsync(plugin);
        }
        else {
            cryptoProApi = new CryptoProApiSync(plugin);
        }
        window.cryptoProApi = Object.assign(cryptoProApi, window.certificatesApi);
    });
};
//# sourceMappingURL=init.js.map