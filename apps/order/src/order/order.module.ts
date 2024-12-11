import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/module/database/database.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

import { OrderController } from './infrastructure/inbound/adapter/order.controller';
import { OrderService } from './infrastructure/inbound/port/order.service';

import { Order, OrderAddress, OrderPayment, OrderProduct, OrderShipment, ViewOrderInfoEntity } from '@apps/order/src/order/domain/entity';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/order/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Order, OrderAddress, OrderPayment, OrderProduct, OrderShipment, ViewOrderInfoEntity])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
