import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@apps/product/src/product/infrastructure/inbound/port/product.service';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Product Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Product Workflow Test!!');
    });
});
