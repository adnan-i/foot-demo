/**
 * Created by Adnan Ibrišimbegović on 05/08/2017.
 */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');
const Config = require('../../../config');
const dataPath = Config.get('/dataPath');

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
        const json = JSON.stringify(content);
        fs.writeFileSync(dataPath, json, 'utf8');
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

            return storeContent(content);
        });

    }

};
