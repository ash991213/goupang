import { Controller, Get } from '@nestjs/common';
import { ShipmentService } from '@apps/shipment/src/shipment/infrastructure/inbound/port/shipment.service';

@Controller()
export class ShipmentController {
    constructor(private readonly shipmentService: ShipmentService) {}

    @Get()
    getHello(): string {
        return this.shipmentService.getHello();
    }
}
