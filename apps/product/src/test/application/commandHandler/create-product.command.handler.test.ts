import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';

import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';

import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';
import { CreateProductCommandHandler } from '@apps/product/src/product/application/commandHandler/create-product.command.handler';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';

import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

import { plainToInstance } from 'class-transformer';

describe('CreateProductCommandHandler', () => {
    let handler: CreateProductCommandHandler;
    let productService: jest.Mocked<IProductService>;
    let publisher: jest.Mocked<EventPublisher>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProductCommandHandler,
                {
                    provide: IProductService,
                    useValue: {
                        generateProductSku: jest.fn(),
                        createProduct: jest.fn(),
                    },
                },
                {
                    provide: EventPublisher,
                    useValue: {
                        mergeObjectContext: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = module.get<CreateProductCommandHandler>(CreateProductCommandHandler);
        productService = module.get<IProductService>(IProductService) as jest.Mocked<IProductService>;
        publisher = module.get<EventPublisher>(EventPublisher) as jest.Mocked<EventPublisher>;
    });

    it('신규 상품을 등록하고 이벤트를 방출한다.', async () => {
        const mockInput = {
            host_id: 1,
            product_name: '테스트 상품',
            product_content: '테스트 상품 설명',
            product_price: 100,
            product_stock: 50,
        };
        const mockProductSku = 'H1-P1';
        const mockProduct = new Product();
        jest.spyOn(productService, 'generateProductSku').mockResolvedValue(mockProductSku);
        jest.spyOn(productService, 'createProduct').mockResolvedValue(mockProduct);
        jest.spyOn(publisher, 'mergeObjectContext').mockImplementation((product) => product);
        jest.spyOn(mockProduct, 'createProduct').mockImplementation(jest.fn());
        jest.spyOn(mockProduct, 'commit').mockImplementation(jest.fn());

        const command = new CreateProductCommand(mockInput);

        const result = await handler.execute(command);

        expect(productService.generateProductSku).toHaveBeenCalledWith(mockInput.host_id);
        expect(productService.createProduct).toHaveBeenCalledWith(plainToInstance(CreateProductInnerDto, { product_sku: mockProductSku, ...mockInput }, { excludeExtraneousValues: true }));
        expect(publisher.mergeObjectContext).toHaveBeenCalledWith(mockProduct);
        expect(mockProduct.createProduct).toHaveBeenCalled();
        expect(mockProduct.commit).toHaveBeenCalled();
        expect(result).toBe(mockProduct);
    });

    it('SKU 생성 실패 시 에러를 반환한다.', async () => {
        const mockInput = {
            host_id: 1,
            product_name: '테스트 상품',
            product_content: '테스트 상품 설명',
            product_price: 100,
            product_stock: 50,
        };
        jest.spyOn(productService, 'generateProductSku').mockRejectedValue(new Error('SKU generation failed'));

        const command = new CreateProductCommand(mockInput);

        await expect(handler.execute(command)).rejects.toThrowError('SKU generation failed');
        expect(productService.createProduct).not.toHaveBeenCalled();
        expect(publisher.mergeObjectContext).not.toHaveBeenCalled();
    });

    it('신규 상품 등록 실패 시 에러를 반환한다.', async () => {
        const mockInput = {
            host_id: 1,
            product_name: '테스트 상품',
            product_content: '테스트 상품 설명',
            product_price: 100,
            product_stock: 50,
        };
        const mockProductSku = 'H1-P1';
        jest.spyOn(productService, 'generateProductSku').mockResolvedValue(mockProductSku);
        jest.spyOn(productService, 'createProduct').mockRejectedValue(new Error('Product creation failed'));

        const command = new CreateProductCommand(mockInput);

        await expect(handler.execute(command)).rejects.toThrowError('Product creation failed');
        expect(publisher.mergeObjectContext).not.toHaveBeenCalled();
    });
});
