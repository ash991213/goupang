import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '@apps/payment/src/payment/infrastructure/inbound/port/payment.service';

describe('PaymentService', () => {
    let service: PaymentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PaymentService],
        }).compile();

        service = module.get<PaymentService>(PaymentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Payment Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Payment Workflow Test!!');
    });
});
