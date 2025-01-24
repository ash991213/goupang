import { Test, TestingModule } from '@nestjs/testing';

import { IProduceService } from '@apps/product/src/product/infrastructure/outbound/port/messageQueue/product.produce.interface';

import { NotifyAdminProductCreationCommand } from '@apps/product/src/product/application/command/notify-admin-product-creation.command';
import { NotifyAdminProductCreationCommandHandler } from '@apps/product/src/product/application/commandHandler/notify-admin-product-creation.command.handler';

import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

import { NOTI_TYPE } from '@apps/product/src/product/domain/enum/product.enum';

describe('NotifyAdminProductCreationCommandHandler', () => {
    let handler: NotifyAdminProductCreationCommandHandler;
    let produceService: jest.Mocked<IProduceService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotifyAdminProductCreationCommandHandler,
                {
                    provide: IProduceService,
                    useValue: {
                        sendNotifyAdminProductCreation: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = module.get<NotifyAdminProductCreationCommandHandler>(NotifyAdminProductCreationCommandHandler);
        produceService = module.get<IProduceService>(IProduceService) as jest.Mocked<IProduceService>;
    });

    it('should call sendNotifyAdminProductCreation with the correct input', async () => {
        const mockInput: SendProductCreationNotiDto = {
            noti_type: NOTI_TYPE.EMAIL,
            host_id: 1,
            product_name: '테스트 상품',
            product_content: '테스트 상품 설명',
            product_price: 1000,
            product_stock: 50,
        };
        const command = new NotifyAdminProductCreationCommand(mockInput);

        await handler.execute(command);

        expect(produceService.sendNotifyAdminProductCreation).toHaveBeenCalledWith(mockInput);
        expect(produceService.sendNotifyAdminProductCreation).toHaveBeenCalledTimes(1);
    });
});
