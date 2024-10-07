import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '@apps/payment/src/payment/infrastructure/inbound/adapter/payment.controller';
import { PaymentService } from '@apps/payment/src/payment/infrastructure/inbound/port/payment.service';

describe('PaymentController', () => {
    let paymentController: PaymentController;
    let paymentService: PaymentService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [PaymentService],
        }).compile();

        paymentController = app.get<PaymentController>(PaymentController);
        paymentService = app.get<PaymentController>(PaymentController);
    });

    it('should be defined', () => {
        expect(paymentController).toBeDefined();
    });

    it('should return "Payment Workflow Test!!"', () => {
        expect(paymentController.getHello()).toBe('Payment Workflow Test!!');
        expect(paymentController.getHello()).toBe(paymentService.getHello());
    });
});
