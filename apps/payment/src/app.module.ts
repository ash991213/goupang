import { Module } from '@nestjs/common';
import { PaymentModule } from '@apps/payment/src/payment/payment.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [PaymentModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
