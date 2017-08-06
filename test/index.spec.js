const chai = require('chai');
const expect = chai.expect;
const Composer = require('../index');

describe('App', () => {

    it('should compose a server', (done) => {
        Composer((err, composedServer) => {
            expect(composedServer).to.be.an('object');
            done(err);
        });
    });

});
