const chai = require('chai');
const expect = chai.expect;
const testSetup = require('../../../test.setup.js');
const Core = require('../../../../server/api/core/index');

describe('Core', () => {

    let request;
    let server;

    beforeEach(() => {
        return testSetup.createApiServer({
            plugins: [Core]
        })
        .then((_server) => server = _server);
    });

    beforeEach(() => {
        request = {
            method: 'GET',
            url: '/'
        };
    });

    it('should return the default message', () => {
        return server.injectThen(request)
        .then((response) => {

            expect(response.result.message).to.match(/found me/i);
            expect(response.statusCode).to.equal(200);

        });
    });

});
