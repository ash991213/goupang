import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentController } from '@apps/shipment/src/shipment/infrastructure/inbound/adapter/shipment.controller';
import { ShipmentService } from '@apps/shipment/src/shipment/infrastructure/inbound/port/shipment.service';

describe('ShipmentController', () => {
    let shipmentController: ShipmentController;
    let shipmentService: ShipmentService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ShipmentController],
            providers: [ShipmentService],
        }).compile();

        shipmentController = app.get<ShipmentController>(ShipmentController);
        shipmentService = app.get<ShipmentController>(ShipmentController);
    });

    it('should be defined', () => {
        expect(shipmentController).toBeDefined();
    });

    it('should return "Shipment Workflow Test!!"', () => {
        expect(shipmentController.getHello()).toBe('Shipment Workflow Test!!');
        expect(shipmentController.getHello()).toBe(shipmentService.getHello());
    });
});
