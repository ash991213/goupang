import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';

import { ProduceService } from '@apps/product/src/product/infrastructure/outbound/adapter/messageQueue/product.produce.service';

import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

import { PRODUCT_CREATION_NOTIFICATION } from '@libs/module/kafka/kafka.topic.const';
import { NOTI_TYPE } from '@apps/product/src/product/domain/enum/product.enum';

describe('ProduceService', () => {
    let service: ProduceService;
    let kafkaClientMock: ClientKafka;

    beforeEach(async () => {
        kafkaClientMock = {
            emit: jest.fn(),
        } as unknown as ClientKafka;

        const module: TestingModule = await Test.createTestingModule({
            providers: [ProduceService, { provide: 'KAFKA_SERVICE', useValue: kafkaClientMock }],
        }).compile();

        service = module.get<ProduceService>(ProduceService);
    });

    describe('sendNotifyAdminProductCreation', () => {
        it('Kafka로 신규 상품 등록 메시지를 전송한다.', () => {
            const createdProduct: SendProductCreationNotiDto = {
                noti_type: NOTI_TYPE.EMAIL,
                host_id: 1,
                product_name: '테스트 상품',
                product_content: '테스트 상품 설명',
                product_price: 1000,
                product_stock: 50,
            };

            service.sendNotifyAdminProductCreation(createdProduct);

            expect(kafkaClientMock.emit).toHaveBeenCalledWith(PRODUCT_CREATION_NOTIFICATION, {
                noti_type: NOTI_TYPE.EMAIL,
                data: {
                    host_id: 1,
                    product_name: '테스트 상품',
                    product_content: '테스트 상품 설명',
                    product_price: 1000,
                    product_stock: 50,
                },
            });
            expect(kafkaClientMock.emit).toHaveBeenCalledTimes(1);
        });
    });
});
