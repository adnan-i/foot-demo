export default function ClientService($resource, Upload) {
    'ngInject';

    const s = $resource('/clients/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });

    s.upload = (file) => {
        return Upload.upload({
            url: `/clients/import`,
            data: {
                file
            }
        });
    };

    return s;

}
