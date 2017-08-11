import {find} from 'lodash';

export default function ClientsFormCtrl(clients, $stateParams, $q, ClientService, NotifierService, $state) {
    'ngInject';

    const $ctrl = this;

    $ctrl.client = find(clients, {id: $stateParams.id});

    $ctrl.save = () => {

        return $q.when()
        .then(() => {
            if ($ctrl.form.$invalid) {
                throw new Error('Form is invalid');
            }

            return ClientService.update({id: $ctrl.client.id}, $ctrl.client);
        })
        .then(() => NotifierService.info('Client updated'))
        .then(() => $state.reload())
        .catch((err) => {
            NotifierService.error(err || 'Could not update')
        });

    };

}
