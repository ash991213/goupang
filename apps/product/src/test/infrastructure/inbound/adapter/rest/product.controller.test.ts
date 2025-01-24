import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { ProductController } from '@apps/product/src/product/infrastructure/inbound/adapter/rest/product.controller';

import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';
import { GetProductDetailQuery } from '@apps/product/src/product/application/query/product-detail.query';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';

import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResImpl } from '@libs/util/res/res.implement';
import { SUCCESS } from '@libs/util/const/error.const';

describe('ProductController', () => {
    let productController: ProductController;
    let queryBus: QueryBus;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: QueryBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: CommandBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        productController = module.get<ProductController>(ProductController);
        queryBus = module.get<QueryBus>(QueryBus);
        commandBus = module.get<CommandBus>(CommandBus);
    });

    describe('getProductDetail', () => {
        it('productId와 일치하는 상품의 상세 정보를 반환한다.', async () => {
            const mockProductId = 10;
            const mockProductDetail = { product_id: 10, product_name: '테스트 상품', product_price: 100 } as Product;
            jest.spyOn(queryBus, 'execute').mockResolvedValue(mockProductDetail);

            const result = await productController.getProductDetail(mockProductId);

            expect(queryBus.execute).toHaveBeenCalledWith(new GetProductDetailQuery(mockProductId));
            expect(result).toEqual(new ResImpl({ ...SUCCESS, data: { product: mockProductDetail } }));
        });
    });

    describe('createProduct', () => {
        it('새로운 상품을 등록한다.', async () => {
            const mockCreateProductDto = { product_name: '테스트 상품', product_price: 100 } as CreateProductReqDto;
            const mockCreatedProduct = { product_id: 1, product_name: '테스트 상품', product_price: 100 } as Product;
            jest.spyOn(commandBus, 'execute').mockResolvedValue(mockCreatedProduct);

            const result = await productController.createProduct(mockCreateProductDto);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreateProductCommand(mockCreateProductDto));
            expect(result).toEqual(new ResImpl({ ...SUCCESS, data: { product: mockCreatedProduct } }));
        });
    });
});
