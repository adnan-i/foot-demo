const ClientsController = require('./clients.ctrl');
const Joi = require('joi');

exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/clients',
        handler: ClientsController.findAll
    });

    server.route({
        method: 'PUT',
        path: '/clients/{id}',
        handler: ClientsController.update,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer()
                },
                payload: Joi.object().keys({
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    dob: Joi.string().regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
                    height: Joi.number().integer()
                    .min(1)
                    .max(500),
                    weight: Joi.number().integer()
                    .min(1)
                    .max(500),
                    gender: Joi.string().valid(['F', 'M'])
                }),
                options: {
                    stripUnknown: true
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/clients/import',
        handler: ClientsController.import,
        config: {
            payload: {
                parse: true,
                output: 'data'
            },
        }
    });

    next();
};


exports.register.attributes = {
    name: 'clients'
};
