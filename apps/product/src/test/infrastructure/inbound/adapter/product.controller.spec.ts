import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@apps/product/src/product/infrastructure/inbound/adapter/product.controller';
import { ProductService } from '@apps/product/src/product/infrastructure/inbound/port/product.service';

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).compile();

        productController = app.get<ProductController>(ProductController);
        productService = app.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(productController).toBeDefined();
    });

    it('should return "Product Workflow Test!!"', () => {
        expect(productController.getHello()).toBe('Product Workflow Test!!');
        expect(productController.getHello()).toBe(productService.getHello());
    });
});
