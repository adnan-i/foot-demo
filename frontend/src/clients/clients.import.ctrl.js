
export default function ClientsImportCtrl(ClientService, NotifierService, $q, $state) {
    'ngInject';

    const $ctrl = this;
    $ctrl.data = {};

    $ctrl.save = () => {

        return $q.when()
        .then(() => {
            if ($ctrl.form.$invalid) {
                throw new Error('Form is invalid');
            }

            return ClientService.upload($ctrl.data.file);
        })
        .then(() => NotifierService.info('File imported'))
        .then(() => $state.reload())
        .catch((err) => {
            NotifierService.error(err || 'Upload failed')
        });

    };

}
