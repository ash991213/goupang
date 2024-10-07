import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '@apps/order/src/order/infrastructure/inbound/adapter/order.controller';
import { OrderService } from '@apps/order/src/order/infrastructure/inbound/port/order.service';

describe('OrderController', () => {
    let orderController: OrderController;
    let orderService: OrderService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [OrderService],
        }).compile();

        orderController = app.get<OrderController>(OrderController);
        orderService = app.get<OrderController>(OrderController);
    });

    it('should be defined', () => {
        expect(orderController).toBeDefined();
    });

    it('should return "Order Workflow Test!!"', () => {
        expect(orderController.getHello()).toBe('Order Workflow Test!!');
        expect(orderController.getHello()).toBe(orderService.getHello());
    });
});
