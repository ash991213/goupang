import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';
import { KafkaModule } from '@libs/module/kafka/kafka.module';

import { ProductController } from '@apps/product/src/product/infrastructure/inbound/adapter/rest/product.controller';
import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';
import { ProductService } from '@apps/product/src/product/application/services/product.service';
import { IProductRepository } from '@apps/product/src/product/infrastructure/outbound/port/repository/product.repository.interface';
import { ProductRepository } from '@apps/product/src/product/infrastructure/outbound/adapter/database/product.repository';
import { IProduceService } from '@apps/product/src/product/infrastructure/outbound/port/messageQueue/product.produce.interface';
import { ProduceService } from '@apps/product/src/product/infrastructure/outbound/adapter/messageQueue/product.produce.service';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';
import { ProductReview } from '@apps/product/src/product/domain/entity/product-review.entity';

import { GetProductDetailQueryHandler } from '@apps/product/src/product/application/queryHandler/product-detail.query.handler';
import { CreateProductCommandHandler } from '@apps/product/src/product/application/commandHandler/create-product.command.handler';
import { NotifyAdminProductCreationCommandHandler } from '@apps/product/src/product/application/commandHandler/notify-admin-product-creation.command.handler';
import { CreateProductSaga } from '@apps/product/src/product/application/saga/create-product.saga';

const CommandHandlers = [GetProductDetailQueryHandler, CreateProductCommandHandler, NotifyAdminProductCreationCommandHandler];
const Sagas = [CreateProductSaga];

@Module({
    imports: [CqrsModule, EnvConfigModule.forRoot([`apps/product/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Product, ProductReview]), KafkaModule],
    controllers: [ProductController],
    providers: [
        {
            provide: IProductService,
            useClass: ProductService,
        },
        {
            provide: IProductRepository,
            useClass: ProductRepository,
        },
        {
            provide: IProduceService,
            useClass: ProduceService,
        },
        ...CommandHandlers,
        ...Sagas,
    ],
})
export class ProductModule {}
