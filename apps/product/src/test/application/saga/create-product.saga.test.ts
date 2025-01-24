import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductEvent } from '@apps/product/src/product/application/events/create-product.event';
import { CreateProductSaga } from '@apps/product/src/product/application/saga/create-product.saga';
import { NotifyAdminProductCreationCommand } from '@apps/product/src/product/application/command/notify-admin-product-creation.command';

import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

import { NOTI_TYPE } from '@apps/product/src/product/domain/enum/product.enum';

import { of } from 'rxjs';
import { plainToInstance } from 'class-transformer';

describe('CreateProductSaga', () => {
    let createProductSaga: CreateProductSaga;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateProductSaga],
        }).compile();

        createProductSaga = module.get<CreateProductSaga>(CreateProductSaga);
    });

    it('CreateProductEvent를 수신할 경우 NotifyAdminProductCreationCommand를 생성한다.', () => {
        const mockInput = {
            host_id: 1,
            product_name: '테스트 상품',
            product_content: '테스트 상품 설명',
            product_price: 100,
            product_stock: 50,
        };
        const createProductEvent = new CreateProductEvent(mockInput);
        const expectedNotificationData = plainToInstance(SendProductCreationNotiDto, { ...mockInput, noti_type: NOTI_TYPE.EMAIL }, { excludeExtraneousValues: true });
        const expectedCommand = new NotifyAdminProductCreationCommand(expectedNotificationData);

        const events$ = of(createProductEvent); // Observable 이벤트로 변환
        const result$ = createProductSaga.productCreated(events$);

        result$.subscribe((command) => {
            expect(command).toBeInstanceOf(NotifyAdminProductCreationCommand);
            expect(command.input).toEqual(expectedCommand.input);
        });
    });
});
