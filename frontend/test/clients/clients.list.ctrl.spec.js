import sinon from 'sinon';
import ClientsListCtrl from '../../src/clients/clients.list.ctrl.js';

describe('clients/clients.list.ctrl.spec', () => {

    let box;
    let createController;
    let $scope;
    let $compile;
    const clients = [{
        id: 1
    }];

    beforeEach(angular.mock.module('fh'));

    beforeEach(() => { box = sinon.sandbox.create(); });
    afterEach(() => { box.restore(); });

    beforeEach(inject((_$controller_, $rootScope, _$compile_) => {
        const $controller = _$controller_;
        $scope = $rootScope.$new();
        $compile = _$compile_;

        createController = () => {
            return $controller(ClientsListCtrl, {
                $scope,
                clients,
            });
        };
    }));

    it('should exist', () => {
        const ctrl = createController();
        expect(ctrl).to.exist;
    });

    it('should assign this.client with the entry from the clients injection, using $stateParams.id', () => {
        const ctrl = createController();
        expect(ctrl.clients).to.deep.equal(clients);
    });

    it('should assign this.sort with {}', () => {
        const ctrl = createController();
        expect(ctrl.sort).to.deep.equal({});
    });

    it('should assign this.filters with {}', () => {
        const ctrl = createController();
        expect(ctrl.filters).to.deep.equal({});
    });

});
