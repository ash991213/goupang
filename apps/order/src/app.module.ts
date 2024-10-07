import { Module } from '@nestjs/common';
import { OrderModule } from '@apps/order/src/order/order.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [OrderModule, EnvConfigModule.forRoot([`apps/order/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
