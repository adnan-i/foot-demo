/**
 * Created by Adnan Ibrišimbegović on 05/08/2017.
 */
const ClientsService = require('./clients.service');

module.exports = class ClientsController {

    static findAll(req, reply) {
        return ClientsService.findAll()
        .then(reply);
    }

    static update(req, reply) {
        return ClientsService.update(req.params.id, req.payload)
        .then(reply);
    }

    static importData(req, reply) {
        return ClientsService.importData(req.payload.file)
        .then((numberImported) => reply({ numberImported }));
    }

};
