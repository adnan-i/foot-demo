import angular from 'angular';
import uiRouter from 'angular-ui-router';
import coreRoutes from './core.routes';
import coreConfig from './core.config';
import coreSettings from './core.settings';
import coreServicesModule from './core.services';
import coreDirectivesModule from './core.directives';
import ngMessages from 'angular-messages';

import clientsModule from '../clients';

import 'bootstrap/dist/css/bootstrap.css';
import './core.css';

const appName = 'app';
const app = angular.module(appName, [uiRouter, clientsModule, coreServicesModule, coreDirectivesModule, ngMessages]);

app
.config(coreRoutes)
.config(coreConfig)
.constant('Settings', coreSettings);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
