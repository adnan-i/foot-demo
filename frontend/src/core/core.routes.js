import angular from 'angular';

export default function routes($urlRouterProvider, $stateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('core', {
    url: '/',
    views: {
      'root': {
        template: require('./core.html'),
        controllerAs: '$ctrl',
        controller: function () {
          'ngInject';
          this.version = angular.version.full;

        }
      },

    },
  })
}
