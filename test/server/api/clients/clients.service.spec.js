const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const chai = require('chai');
const expect = chai.expect;
const ClientsService = require('../../../../server/api/clients/clients.service');
const Config = require('../../../../config');
const dataPath = Config.get('/dataPath');
const _ = require('lodash');

describe('ClientsService', () => {

    describe('findAll', () => {

        let fixtureContent;

        beforeEach(() => {
            const file = fs.readFileSync(dataPath);
            fixtureContent = JSON.parse(file);
        });

        it('should return the content of filePath in JSON format', () => {

            expect(fixtureContent).to.exist;
            expect(fixtureContent).to.be.an('array');
            expect(fixtureContent[0]).to.be.an('object');

            return ClientsService.findAll()
            .then((content) => {
                expect(content).to.deep.equal(fixtureContent);
            });
        });

    });

    describe('update', () => {

        let fixtureContent;
        let safeCopy;

        beforeEach(() => {
            return Promise.resolve()
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
            const item = _.find(fixtureContent, { id });
            expect(item).to.be.an('object');

            const newHeight = item.height + 1;
            return ClientsService.update(item.id, { height: newHeight })
            .then(() => ClientsService.findAll())
            .then((content) => {
                expect(content).to.be.an('array');
                const newItem = _.find(content, { id });
                expect(newItem).to.exist;
                expect(newItem.height).to.equal(newHeight);
            });

        });

    });

});
