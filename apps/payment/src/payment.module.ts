import { Module } from '@nestjs/common';
import { PaymentController } from '@apps/payment/src/payment.controller';
import { PaymentService } from '@apps/payment/src/payment.service';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
