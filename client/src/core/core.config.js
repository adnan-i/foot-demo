export default function Config($httpProvider, $locationProvider) {
    'ngInject';

    $httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.html5Mode(true);
}
