import { Controller, Get } from '@nestjs/common';
import { OrderService } from '@apps/order/src/order/infrastructure/inbound/port/order.service';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    getHello(): string {
        return this.orderService.getHello();
    }
}
