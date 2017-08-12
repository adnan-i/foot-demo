/**
 * Created by Adnan Ibrišimbegović on 05/08/2017.
 */
const ClientsService = require('./clients.service');
const Boom = require('boom');

module.exports = class ClientsController {

    static findAll(req, reply) {
        return ClientsService.findAll()
        .then((content) => reply(content))
        .catch((err) => {
            reply(err.isBoom ? err : Boom.boomify(err));
        });

    }

    static update(req, reply) {

        return ClientsService.update(req.params.id, req.payload)
        .then((updatedItem) => reply(updatedItem))
        .catch((err) => {
            reply(err.isBoom ? err : Boom.boomify(err));
        });

    }

    static importData(req, reply) {

        return ClientsService.importData(req.payload.file)
        .then((numberImported) => reply({ numberImported }))
        .catch((err) => {
            reply(err.isBoom ? err : Boom.boomify(err));
        });
    }

};
