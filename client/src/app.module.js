import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './app.routes';

const appName = 'app';
const app = angular.module(appName, [uiRouter]);

app.config(routes);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
