import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '@apps/payment/src/payment.controller';
import { PaymentService } from '@apps/payment/src/payment.service';

describe('PaymentController', () => {
    let paymentController: PaymentController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [PaymentService],
        }).compile();

        paymentController = app.get<PaymentController>(PaymentController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(paymentController.getHello()).toBe('Hello World!');
        });
    });
});
