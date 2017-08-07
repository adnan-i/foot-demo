import ClientsCtrl from './clients.list.ctrl.js';
import ClientsFormCtrl from './clients.form.ctrl.js';
import ClientsImportCtrl from './clients.import.ctrl.js';

export default function routes($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.when('/clients', '/clients/index');

    $stateProvider
    .state('core.clients', {
        url: 'clients',
        views: {
            'core': {
                template: require('./clients.html'),
            },
        },
        resolve: {
            clients: (ClientService) => {
                'ngInject';
                return ClientService.query().$promise;
            }
        }
    })
    .state('core.clients.index', {
        url: '/index?{firstName}&{lastName}&{dob}&sortBy&reverse',
        params: {
            firstName: {
                dynamic: true
            }
        },
        reloadOnSearch: false,
        views: {
            'clients': {
                template: require('./list.html'),
                controller: ClientsCtrl,
                controllerAs: '$ctrl'
            },

        },
    })
    .state('core.clients.edit', {
        url: '/{id:int}/edit',
        views: {
            'clients': {
                template: require('./form.html'),
                controller: ClientsFormCtrl,
                controllerAs: '$ctrl'
            },

        },
    })
    .state('core.clients.import', {
        url: '/import',
        views: {
            'clients': {
                template: require('./import.html'),
                controller: ClientsImportCtrl,
                controllerAs: '$ctrl'
            },

        },
    });
}
