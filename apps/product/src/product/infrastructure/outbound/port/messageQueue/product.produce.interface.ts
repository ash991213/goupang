import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

export abstract class IProduceService {
    abstract sendNotifyAdminProductCreation(createdProduct: SendProductCreationNotiDto): void;
}
