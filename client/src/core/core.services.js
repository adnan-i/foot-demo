/**
 * Created by Adnan Ibrišimbegović on 06/08/2017.
 */

import angular from 'angular';
import cgNotify from '@cgross/angular-notify';
import '@cgross/angular-notify/angular-notify.css';

const module = angular.module('core.services', [cgNotify]);

module.factory('HttpInterceptor', function HttpInterceptor($q, Settings){
    'ngInject';

    return {
        request: (config) => {
            if (config.url.indexOf('http') === 0) {
                // Let through calls to absolute urls (e.g. loggly.com)
                return config;
            }

            if (config.url.indexOf('html') !== -1) {
                // Let through call to html files
                return config;
            }

            // Otherwise prepend api calls with api prefix
            if (config.url.charAt(0) !== '/') {
                config.url = `/${config.url}`;
            }
            config.url = Settings.apiPrefix + config.url;

            return config;
        },
        responseError: (error) => {
            return $q.reject(error);
        },
    };

});

module.service('NotifierService', function NotifierService(notify) {
    // Wrapper for the third-party "notify" service ("cgNotify" module)

    notify.config({
        duration: 3000,
        position: 'right',
        maximumOpen: 5,
        startTop: 80,
    });

    function getOpts(options) {
        let opts = {};
        if (angular.isString(options)) {
            opts.message = options;
        } else if (options instanceof Error) {
            opts.message = options.message;
        } else if (angular.isObject(options)) {
            opts = options;
        } else {
            opts.message = '-';
        }

        return opts;
    }

    const factory = {};

    factory.info = function (options) {
        const opts = getOpts(options);
        opts.classes = ['alert-info'];
        return notify(opts);
    };

    factory.error = function (options) {
        const opts = getOpts(options);
        opts.classes = ['alert-danger'];
        return notify(opts);
    };

    factory.danger = factory.error;
    factory.closeAll = notify.closeAll;

    return factory;

});

export default module.name;
