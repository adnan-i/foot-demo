import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';

import coreRoutes from './core.routes';
import coreConfig from './core.config';
import coreSettings from './core.settings';
import coreServices from './core.services';
import coreDirectives from './core.directives';
import 'bootstrap/dist/css/bootstrap.css';
import './core.css';

const module = angular.module('fh.core', [
    uiRouter,
    coreServices,
    coreDirectives,
    ngMessages
]);

module
.config(coreRoutes)
.config(coreConfig)
.constant('Settings', coreSettings);

export default module.name;
