import { Test, TestingModule } from '@nestjs/testing';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';

describe('NotiService', () => {
    let service: NotiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NotiService],
        }).compile();

        service = module.get<NotiService>(NotiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Noti Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Noti Workflow Test!!');
    });
});
