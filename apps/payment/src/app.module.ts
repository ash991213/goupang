import { Module } from '@nestjs/common';
import { PaymentModule } from '@apps/payment/src/payment/payment.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [PaymentModule, EnvConfigModule.forRoot([`apps/payment/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
