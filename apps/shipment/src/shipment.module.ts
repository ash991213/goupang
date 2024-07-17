import { Module } from '@nestjs/common';
import { ShipmentController } from '@apps/shipment/src/shipment.controller';
import { ShipmentService } from '@apps/shipment/src/shipment.service';

@Module({
    imports: [],
    controllers: [ShipmentController],
    providers: [ShipmentService],
})
export class ShipmentModule {}
