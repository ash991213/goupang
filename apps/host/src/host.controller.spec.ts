import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from '@apps/host/src/host.controller';
import { HostService } from '@apps/host/src/host.service';

describe('HostController', () => {
    let hostController: HostController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [HostController],
            providers: [HostService],
        }).compile();

        hostController = app.get<HostController>(HostController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(hostController.getHello()).toBe('Hello World!');
        });
    });
});
