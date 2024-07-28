import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/inbound/adapter/order.controller';
import { OrderService } from './infrastructure/inbound/port/order.service';

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
