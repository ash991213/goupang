import { Module } from '@nestjs/common';
import { OrderModule } from '@apps/order/src/order/order.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [OrderModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
