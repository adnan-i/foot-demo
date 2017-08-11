import sinon from 'sinon';
import ClientsFormCtrl from '../../src/clients/clients.form.ctrl.js';

describe('clients/clients.form.ctrl.spec', () => {

    let box;
    let createController;
    let $stateParams;
    let ClientService;
    let $q;
    let $state;
    let $compile;
    let $scope;
    let NotifierService;
    const clients = [{
        id: 1
    }];
    const template = require('../../src/clients/form.html');

    beforeEach(angular.mock.module('fh'));

    beforeEach(() => { box = sinon.sandbox.create(); });
    afterEach(() => { box.restore(); });

    beforeEach(inject((_$controller_, $rootScope, _$stateParams_, _ClientService_, _$q_, _$state_, _$compile_,
                       _NotifierService_) => {
        const $controller = _$controller_;
        $scope = $rootScope.$new();
        $stateParams = _$stateParams_;
        ClientService = _ClientService_;
        $q = _$q_;
        $state = _$state_;
        $compile = _$compile_;
        NotifierService = _NotifierService_;

        createController = () => {
            return $controller(ClientsFormCtrl, {
                $scope,
                clients,
                $stateParams,
                ClientService
            });
        };
    }));

    it('should exist', () => {
        const ctrl = createController();
        expect(ctrl).to.exist;
    });

    it('should assign this.client with the entry from the clients injection, using $stateParams.id', () => {
        $stateParams.id = 1;
        const ctrl = createController();
        expect(ctrl.client).to.deep.equal(clients[0]);
    });

    describe('method save ', () => {

        it('should exist', () => {
            const ctrl = createController();
            expect(ctrl.save).to.be.a('function');
        });

        it('should toast an error if form is $invalid', () => {

            const updateStub = box.stub(ClientService, 'update').callsFake(() => $q.resolve());

            const stateStub = box.stub($state, 'reload');
            const NotifierServiceStub = box.spy(NotifierService, 'error');

            const ctrl = createController();
            $scope.$ctrl = ctrl;

            $compile(template)($scope);
            $scope.$apply();

            expect(ctrl.form, '.form exists').to.exist;
            expect(ctrl.form.$invalid, 'form.$invalid').to.be.false;
            ctrl.form.dob.$setViewValue('a');
            expect(ctrl.form.$invalid, 'form.$invalid').to.be.true;

            ctrl.save();
            $scope.$digest();

            expect(updateStub.called, 'updateStub.called').to.be.false;
            expect(stateStub.called, 'stateStub.called').to.be.false;
            const error = NotifierServiceStub.args[0][0];
            expect(error instanceof Error).to.be.true;
            expect(error.message).to.equal('Form is invalid');

        });

        it('should update the client ', () => {

            $stateParams.id = 1;

            const updateStub = box.stub(ClientService, 'update').callsFake(() => $q.resolve());
            const stateStub = box.stub($state, 'reload');
            const NotifierServiceErrorStub = box.spy(NotifierService, 'error');
            const NotifierServiceInfoStub = box.spy(NotifierService, 'info');

            const ctrl = createController();
            $scope.$ctrl = ctrl;

            expect(ctrl.client).to.exist;
            expect(ctrl.client.id).to.exist;

            $compile(template)($scope);
            $scope.$apply();

            expect(ctrl.form, '.form exists').to.exist;
            expect(ctrl.form.$invalid, 'form.$invalid').to.be.false;

            ctrl.save();
            $scope.$digest();

            expect(updateStub.called, 'updateStub.called').to.be.true;
            expect(stateStub.called, 'stateStub.called').to.be.true;
            expect(NotifierServiceErrorStub.called).to.be.false;
            expect(NotifierServiceInfoStub.called).to.be.true;
            const message = NotifierServiceInfoStub.args[0][0];
            expect(message).to.equal('Client updated');

        });

    });

});
