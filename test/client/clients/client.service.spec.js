import sinon from 'sinon';

describe('clients/client.service.spec', () => {

    let ClientService;
    let Upload;
    let box;

    beforeEach(angular.mock.module('fh'));

    beforeEach(() => { box = sinon.sandbox.create(); });
    afterEach(() => { box.restore(); });

    beforeEach(inject((_ClientService_, _Upload_) => {
        ClientService = _ClientService_;
        Upload = _Upload_;
    }));

    it('should exist', () => {
        expect(ClientService).to.exist;
    });

    describe('method upload', () => {

        it('should exist', () => {
            expect(ClientService.upload).to.be.a('function');
        });

        it('should call upload method from the Upload service', () => {
            const stub = box.stub(Upload, 'upload');
            const file = 'file';

            ClientService.upload(file);

            expect(stub.called).to.be.true;
            expect(stub.calledWith({
                url: `/clients/import`,
                data: { file }
            })).to.be.true;

        });

    });

});
