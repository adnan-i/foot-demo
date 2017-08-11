/**
 * Created by Adnan Ibrišimbegović on 06/08/2017.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import 'ng-file-upload/dist/ng-file-upload-all';

import ClientRoutes from './clients.routes.js'
import ClientService from './client.service';

const module = angular.module('fh.clients', [
    uiRouter,
    ngResource,
    'ngFileUpload'
]);

module
.config(ClientRoutes)
.service('ClientService', ClientService);

export default module.name;
