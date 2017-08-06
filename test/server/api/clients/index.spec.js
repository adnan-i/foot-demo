const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const chai = require('chai');
const Clients = require('../../../../server/api/clients/index');
const Config = require('../../../../config');
const testSetup = require('../../../test.setup.js');

const expect = chai.expect;
const dataPath = Config.get('/dataPath');
const _ = require('lodash');
const path = '/clients';

describe('Clients routes', () => {

    describe(`GET ${path} `, () => {

        let fixtureContent;
        let server;

        beforeEach(() => {
            return testSetup.createApiServer({
                plugins: [Clients]
            })
            .then((_server) => server = _server)
            .then(() => {
                const file = fs.readFileSync(dataPath);
                fixtureContent = JSON.parse(file);
            });
        });

        it('should return the content of clients JSON', () => {

            expect(fixtureContent).to.exist;
            expect(fixtureContent).to.be.an('array');

            return server.injectThen({
                method: 'GET',
                url: path,
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal(fixtureContent);
            });

        });

    });

    describe(`PUT ${path}/{id} `, () => {

        let fixtureContent;
        let safeCopy;
        let server;

        beforeEach(() => {
            return testSetup.createApiServer({
                plugins: [Clients]
            })
            .then((_server) => server = _server)
            .then(() => {
                const file = fs.readFileSync(dataPath);
                fixtureContent = JSON.parse(file);
                safeCopy = _.cloneDeep(fixtureContent);

            });
        });

        afterEach(() => {
            return Promise.resolve()
            .then(() => {
                const json = JSON.stringify(safeCopy);
                fs.writeFileSync(dataPath, json, 'utf8');
            });

        });

        it('should update the target item', () => {

            expect(fixtureContent).to.exist;
            expect(fixtureContent).to.be.an('array');
            const id = 2;
            const item = _.find(fixtureContent, {id});
            expect(item).to.be.an('object');

            const newHeight = item.height + 1;

            return server.injectThen({
                method: 'PUT',
                url: `${path}/${id}`,
                payload: {
                    height: newHeight
                }
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);

                return server.injectThen({
                    method: 'GET',
                    url: path,
                });
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.result).to.be.an('array');

                const newItem = _.find(res.result, {id});
                expect(newItem).to.exist;
                expect(newItem.height).to.equal(newHeight);
            });

        });

    });

});
