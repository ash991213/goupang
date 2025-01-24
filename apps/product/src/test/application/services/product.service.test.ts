import { Test, TestingModule } from '@nestjs/testing';

import { ProductService } from '@apps/product/src/product/application/service/product.service';
import { IProductRepository } from '@apps/product/src/product/infrastructure/outbound/port/repository/product.repository.interface';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';

import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResException } from '@libs/util/res/res.exception';
import { PRODUCT_CREATE_FAILED, PRODUCT_NOT_FOUND, PRODUCT_SELECT_FAILED, PRODUCT_SELECT_FAILED_BY_HOST_ID } from '@libs/util/const/error.const';

describe('ProductService', () => {
    let productService: ProductService;
    let productRepository: jest.Mocked<IProductRepository>;

    beforeEach(async () => {
        const mockProductRepository = {
            getProductDetail: jest.fn(),
            getProductCountByHostId: jest.fn(),
            createProduct: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, { provide: IProductRepository, useValue: mockProductRepository }],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productRepository = module.get<IProductRepository>(IProductRepository) as jest.Mocked<IProductRepository>;
    });

    describe('getProductDetail', () => {
        it('상품 ID와 일치하는 상품의 상세 정보를 반환한다.', async () => {
            const productId = 1;
            const mockProductDetail = { product_id: 1, product_name: '테스트 상품', product_price: 100 } as Product;
            productRepository.getProductDetail.mockResolvedValue(mockProductDetail);

            const result = await productService.getProductDetail(productId);

            expect(result).toEqual(mockProductDetail);
            expect(productRepository.getProductDetail).toHaveBeenCalledWith(productId);
        });

        it('상품을 찾지 못할 경우 PRODUCT_NOT_FOUND 에러를 반환한다.', async () => {
            const productId = 1;
            productRepository.getProductDetail.mockResolvedValue(null);

            await expect(productService.getProductDetail(productId)).rejects.toThrow(ResException);
            await expect(productService.getProductDetail(productId)).rejects.toThrowError(PRODUCT_NOT_FOUND.message);
        });

        it('Repository에서 에러가 발생할 경우 PRODUCT_SELECT_FAILED 에러를 반환한다.', async () => {
            const productId = 1;
            productRepository.getProductDetail.mockRejectedValue(new Error('database timeout error'));

            await expect(productService.getProductDetail(productId)).rejects.toThrow(ResException);
            await expect(productService.getProductDetail(productId)).rejects.toThrowError(PRODUCT_SELECT_FAILED.message);
        });
    });

    describe('generateProductSku', () => {
        it('Host ID와 호스트의 등록 상품 수를 기준으로 상품 SKU를 반환한다.', async () => {
            const hostId = 1;
            const productCountByHostId = 5;
            productRepository.getProductCountByHostId.mockResolvedValue(productCountByHostId);

            const result = await productService.generateProductSku(hostId);

            expect(result).toBe('H1-P6');
            expect(productRepository.getProductCountByHostId).toHaveBeenCalledWith(hostId);
        });

        it('Repository에서 에러가 발생할 경우 PRODUCT_NOT_SELECT_FAILED_BY_HOST_ID 에러를 반환한다.', async () => {
            const hostId = 1;
            productRepository.getProductCountByHostId.mockRejectedValue(new Error('database timeout error'));

            await expect(productService.generateProductSku(hostId)).rejects.toThrow(ResException);
            await expect(productService.generateProductSku(hostId)).rejects.toThrowError(PRODUCT_SELECT_FAILED_BY_HOST_ID.message);
        });
    });

    describe('createProduct', () => {
        it('신규 상품을 등록한다.', async () => {
            const mockProduct: CreateProductInnerDto = {
                host_id: 1,
                product_name: '테스트 상품',
                product_content: '테스트 상품 설명',
                product_price: 100,
                product_sku: 'H1-P1',
                product_stock: 50,
            };
            const createdProduct = { product_id: 1, ...mockProduct } as Product;
            productRepository.createProduct.mockResolvedValue(createdProduct);

            const result = await productService.createProduct(mockProduct);

            expect(result).toEqual(createdProduct);
            expect(productRepository.createProduct).toHaveBeenCalledWith(mockProduct);
        });

        it('Repository에서 에러가 발생한 경우 PRODUCT_CREATE_FAILED 에러를 반환한다.', async () => {
            const mockProduct: CreateProductInnerDto = {
                host_id: 1,
                product_name: '테스트 상품',
                product_content: '테스트 상품 설명',
                product_price: 100,
                product_sku: 'H1-P1',
                product_stock: 50,
            };
            productRepository.createProduct.mockRejectedValue(new Error('database timeout error'));

            await expect(productService.createProduct(mockProduct)).rejects.toThrow(ResException);
            await expect(productService.createProduct(mockProduct)).rejects.toThrowError(PRODUCT_CREATE_FAILED.message);
        });
    });
});
