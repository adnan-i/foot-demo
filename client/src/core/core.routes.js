export default function routes($urlRouterProvider, $stateProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('core', {
        url: '/',
        views: {
            'root': {
                template: require('./core.html'),
            },

        },
    })
}
