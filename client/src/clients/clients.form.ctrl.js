import _ from 'lodash';

export default function ClientsFromCtrl(clients, $stateParams, $q, ClientService, NotifierService, $state) {
    'ngInject';

    const $ctrl = this;

    $ctrl.client = _.find(clients, {id: $stateParams.id});

    $ctrl.save = () => {

        return $q.when()
        .then(() => {
            if ($ctrl.form.$invalid) {
                throw new Error('Form is invalid');
            }

            return ClientService.update({id: $ctrl.client.id}, $ctrl.client).$promise;
        })
        .then(() => NotifierService.info('Client updated'))
        .then(() => $state.reload())
        .catch((err) => {
            NotifierService.error(err || 'Could not update')
        });

    };

}
