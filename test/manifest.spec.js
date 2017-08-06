const chai = require('chai');
const expect = chai.expect;
const Manifest = require('../manifest');

describe('Manifest', () => {

    it('should get manifest data', () => {
        expect(Manifest.get('/')).to.be.an('object');
    });

    it('should get manifest meta data', () => {
        expect(Manifest.meta('/')).to.match(/this file defines the plot device/i);
    });

});
