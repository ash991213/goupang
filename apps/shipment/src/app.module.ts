import { Module } from '@nestjs/common';
import { ShipmentModule } from '@apps/shipment/src/shipment/shipment.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [ShipmentModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
