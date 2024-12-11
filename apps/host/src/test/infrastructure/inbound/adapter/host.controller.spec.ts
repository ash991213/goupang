import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from '@apps/host/src/host/infrastructure/inbound/adapter/host.controller';
import { HostService } from '@apps/host/src/host/infrastructure/inbound/port/host.service';

describe('HostController', () => {
    let hostController: HostController;
    let hostService: HostService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [HostController],
            providers: [HostService],
        }).compile();

        hostController = app.get<HostController>(HostController);
        hostService = app.get<HostController>(HostController);
    });

    it('should be defined', () => {
        expect(hostController).toBeDefined();
    });

    it('should return "Host Workflow Test!!"', () => {
        expect(hostController.getHello()).toBe('Host Workflow Test!');
        expect(hostController.getHello()).toBe(hostService.getHello());
    });
});
