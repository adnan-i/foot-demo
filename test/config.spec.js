const chai = require('chai');
const expect = chai.expect;
const Config = require('../config');

describe('Config', () => {

    it('should get config data', () => {
        expect(Config.get('/')).to.be.an('object');
    });

    it('should get config meta data', () => {
        expect(Config.meta('/')).to.match(/this file configures the plot device/i);
    });

});
