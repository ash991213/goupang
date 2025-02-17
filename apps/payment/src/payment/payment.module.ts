import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { PaymentController } from '@apps/payment/src/payment/infrastructure/inbound/adapter/payment.controller';
import { PaymentService } from '@apps/payment/src/payment/infrastructure/inbound/port/payment.service';

import { Payment } from '@apps/payment/src/payment/domain/entity/payment.entity';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/payment/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Payment])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
