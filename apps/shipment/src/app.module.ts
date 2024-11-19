import { Module } from '@nestjs/common';
import { ShipmentModule } from '@apps/shipment/src/shipment/shipment.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [ShipmentModule, EnvConfigModule.forRoot([`apps/shipment/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
