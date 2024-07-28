import { Module } from '@nestjs/common';
import { PaymentController } from '@apps/payment/src/payment/infrastructure/inbound/adapter/payment.controller';
import { PaymentService } from '@apps/payment/src/payment/infrastructure/inbound/port/payment.service';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
