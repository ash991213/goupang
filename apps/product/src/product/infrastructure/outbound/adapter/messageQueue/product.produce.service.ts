import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { IProduceService } from '@apps/product/src/product/infrastructure/outbound/port/messageQueue/product.produce.interface';

import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

import { PRODUCT_CREATION_NOTIFICATION } from '@libs/module/kafka/kafka.topic.const';

@Injectable()
export class ProduceService implements IProduceService {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    sendNotifyAdminProductCreation(createdProduct: SendProductCreationNotiDto) {
        const { noti_type, ...data } = createdProduct;
        this.kafkaClient.emit(PRODUCT_CREATION_NOTIFICATION, { noti_type, data });
    }
}
