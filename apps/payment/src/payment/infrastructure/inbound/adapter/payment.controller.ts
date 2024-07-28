import { Controller, Get } from '@nestjs/common';
import { PaymentService } from '@apps/payment/src/payment/infrastructure/inbound/port/payment.service';

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get()
    getHello(): string {
        return this.paymentService.getHello();
    }
}
