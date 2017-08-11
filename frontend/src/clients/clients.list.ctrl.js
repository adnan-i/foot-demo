
export default function ClientsListCtrl($scope, clients) {
    'ngInject';
    const $ctrl = this;

    $ctrl.clients = clients;
    $ctrl.sort = {};
    $ctrl.filters = {};

}
