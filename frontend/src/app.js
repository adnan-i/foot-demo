import angular from 'angular';
import coreModule from './core/index';
import clientsModule from './clients/index';

const moduleName = 'fh';
angular.module(moduleName, [
    coreModule,
    clientsModule,
]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [moduleName]);
});
