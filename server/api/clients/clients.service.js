/**
 * Created by Adnan Ibrišimbegović on 05/08/2017.
 */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');
const Config = require('../../../config');
const dataPath = Config.get('/dataPath');
const Joi = require('joi');
const Boom = require('boom');

const clientsSchema = Joi.array().items(Joi.object().keys({
    id: Joi.number().integer().required(),
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
}));

function getContent() {
    return Promise.resolve()
    .then(() => {
        const file = fs.readFileSync(dataPath);
        return JSON.parse(file);
    });
}

function storeContent(content) {
    return Promise.resolve()
    .then(() => {
        const joiValidationResult = Joi.validate(content, clientsSchema);
        if (joiValidationResult.error) {
            throw Boom.badRequest(joiValidationResult.error, content);
        }

        const json = JSON.stringify(content);
        fs.writeFileSync(dataPath, json, 'utf8');
        return content.length;
    });

}

module.exports = class ClientsService {

    /**
     * Returns all data
     * @returns {array}
     */
    static findAll() {
        return getContent();
    }

    /**
     * Updates the item by id
     * @param {int} id
     * @param {object} data
     * @returns {*|Promise.<void>}
     */
    static update(id, data) {
        return getContent()
        .then((content) => {
            const item = _.find(content, { id });
            if (!item) {
                throw new Error(`Could not find an item with id ${id}`);
            }

            _.merge(item, data);

            return storeContent(content)
            .then(() => item);
        });

    }

    static importData(data) {
        return storeContent(data);

    }

};
