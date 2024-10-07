import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '@apps/order/src/order/infrastructure/inbound/port/order.service';

describe('OrderService', () => {
    let service: OrderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderService],
        }).compile();

        service = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Order Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Order Workflow Test!!');
    });
});
