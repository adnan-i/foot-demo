export default function ClientService($resource, Upload, Settings) {
    'ngInject';

    const service = $resource('/clients/:id', { id: '@id' }, {
        actions: {
            findAll: {
                method: 'GET',
                isArray: true
            }
        }
    });

    service.upload = (file) => {
        return Upload.upload({
            url: `${Settings.apiPrefix}/clients/import`,
            data: {
                file
            }
        });
    };

    return service;

}
