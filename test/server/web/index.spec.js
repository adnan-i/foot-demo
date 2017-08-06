const chai = require('chai');
const expect = chai.expect;

const testSetup = require('../../test.setup.js');
const HomePlugin = require('../../../server/web/index');

describe('Home Page View', () => {

    let request;
    let server;

    before(() => {
        return testSetup.createWebServer({
            plugins: [HomePlugin]
        })
        .then((_server) => server = _server);
    });

    beforeEach(() => {
        request = {
            method: 'GET',
            url: '/'
        };
    });

    it('should properly render home page', () => {
        return server.injectThen(request)
        .then((response) => {
            expect(response.result).to.match(/foothold demo/i);
            expect(response.statusCode).to.equal(200);
        });

    });

});
