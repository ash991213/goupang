import { Test, TestingModule } from '@nestjs/testing';
import { NotiController } from '@apps/noti/src/noti/infrastructure/inbound/adapter/noti.controller';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';

describe('NotiController', () => {
    let notiController: NotiController;
    let notiService: NotiService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [NotiController],
            providers: [NotiService],
        }).compile();

        notiController = app.get<NotiController>(NotiController);
        notiService = app.get<NotiController>(NotiController);
    });

    it('should be defined', () => {
        expect(notiController).toBeDefined();
    });

    it('should return "Noti Workflow Test!!"', () => {
        expect(notiController.getHello()).toBe('Noti Workflow Test!');
        expect(notiController.getHello()).toBe(notiService.getHello());
    });
});
