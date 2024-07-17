import { Test, TestingModule } from '@nestjs/testing';
import { NotiController } from '@apps/noti/src/noti.controller';
import { NotiService } from '@apps/noti/src/noti.service';

describe('NotiController', () => {
    let notiController: NotiController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [NotiController],
            providers: [NotiService],
        }).compile();

        notiController = app.get<NotiController>(NotiController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(notiController.getHello()).toBe('Hello World!');
        });
    });
});
