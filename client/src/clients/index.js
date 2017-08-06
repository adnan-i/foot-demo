/**
 * Created by Adnan Ibrišimbegović on 06/08/2017.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './clients.routes.js'
import ClientService from './client.service';
import ngResource from 'angular-resource';
import 'ng-file-upload/dist/ng-file-upload-all';

export default angular.module('app.clients', [uiRouter, ngResource, 'ngFileUpload'])
.config(routes)
.service('ClientService', ClientService)
.name;
