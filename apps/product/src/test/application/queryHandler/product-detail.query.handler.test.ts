import { Test, TestingModule } from '@nestjs/testing';

import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';

import { GetProductDetailQuery } from '@apps/product/src/product/application/query/product-detail.query';
import { GetProductDetailQueryHandler } from '@apps/product/src/product/application/queryHandler/product-detail.query.handler';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';

describe('GetProductDetailQueryHandler', () => {
    let handler: GetProductDetailQueryHandler;
    let productService: IProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProductDetailQueryHandler,
                {
                    provide: IProductService,
                    useValue: {
                        getProductDetail: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = module.get<GetProductDetailQueryHandler>(GetProductDetailQueryHandler);
        productService = module.get<IProductService>(IProductService);
    });

    it('execute 메서드를 호출하면 상품 상세 정보를 반환한다.', async () => {
        const productId = 1;
        const mockProductDetail = { product_id: 1, product_name: '테스트 상품', product_price: 100 } as Product;
        const query = new GetProductDetailQuery(productId);

        jest.spyOn(productService, 'getProductDetail').mockResolvedValue(mockProductDetail);

        const result = await handler.execute(query);

        expect(productService.getProductDetail).toHaveBeenCalledWith(productId);
        expect(result).toEqual(mockProductDetail);
    });
});
