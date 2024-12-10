import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { ShipmentController } from '@apps/shipment/src/shipment/infrastructure/inbound/adapter/shipment.controller';
import { ShipmentService } from '@apps/shipment/src/shipment/infrastructure/inbound/port/shipment.service';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/shipment/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [ShipmentController],
    providers: [ShipmentService],
})
export class ShipmentModule {}
