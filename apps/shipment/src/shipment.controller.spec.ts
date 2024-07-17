import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentController } from '@apps/shipment/src/shipment.controller';
import { ShipmentService } from '@apps/shipment/src/shipment.service';

describe('ShipmentController', () => {
    let shipmentController: ShipmentController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ShipmentController],
            providers: [ShipmentService],
        }).compile();

        shipmentController = app.get<ShipmentController>(ShipmentController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(shipmentController.getHello()).toBe('Hello World!');
        });
    });
});
