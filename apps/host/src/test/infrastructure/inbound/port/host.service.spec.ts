import { Test, TestingModule } from '@nestjs/testing';
import { HostService } from '@apps/host/src/host/infrastructure/inbound/port/host.service';

describe('HostService', () => {
    let service: HostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HostService],
        }).compile();

        service = module.get<HostService>(HostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Host Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Host Workflow Test!');
    });
});
