import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentService } from '@apps/shipment/src/shipment/infrastructure/inbound/port/shipment.service';

describe('ShipmentService', () => {
    let service: ShipmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ShipmentService],
        }).compile();

        service = module.get<ShipmentService>(ShipmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Shipment Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Shipment Workflow Test!!');
    });
});
