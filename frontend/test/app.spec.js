describe('app.spec', () => {
    const moduleName = 'fh';

    beforeEach(angular.mock.module(moduleName));

    it(`should define the top-level module "${moduleName}"`, () => {
        expect(angular.module('fh')).to.exist;
    });

});
