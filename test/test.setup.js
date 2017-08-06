const Config = require('../config');
const Hapi = require('hapi');
const Promise = require('bluebird');
const InjectThen = require('inject-then');
const _ = require('lodash');

function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

module.exports = {
    createWebServer: (options) => {

        const server = new Hapi.Server();
        server.connection({ port: Config.get('/port/web') });
        const register = Promise.promisify(server.register, { context: server });

        const opts = _.mergeWith({
            plugins: [require('inert'), require('vision'), InjectThen],
            callback: () => {
                server.views({
                    engines: { ejs: require('ejs') },
                    path: './server/web'
                });
            }
        }, options, customizer);

        return register(opts.plugins)
        .then(opts.callback)
        .then(() => server);

    },

    createApiServer: (options) => {

        const server = new Hapi.Server();
        server.connection({ port: Config.get('/port/web') });
        const register = Promise.promisify(server.register, { context: server });

        const opts = _.mergeWith({
            plugins: [InjectThen],
        }, options, customizer);

        return register(opts.plugins)
        .then(() => server);

    }
};
