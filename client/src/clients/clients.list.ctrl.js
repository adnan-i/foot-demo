
export default function ClientsListCtrl($scope, clients) {
    'ngInject';
    const $ctrl = this;

    $ctrl.clients = clients;
    $ctrl.sort = {};
    $ctrl.filters = {};

    $scope.$watch(() => $ctrl.filters, () => {
        console.log('filters are now', $ctrl.filters);
    }, true);

}
