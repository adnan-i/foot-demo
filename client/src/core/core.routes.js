export default function routes($urlRouterProvider, $stateProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('core', {
        url: '/',
        views: {
            'root': {
                template: require('./core.html'),
                controller: function(){
                    this.list = [1,2];
                },
                controllerAs: '$ctrl'
            },

        },
    })
}
