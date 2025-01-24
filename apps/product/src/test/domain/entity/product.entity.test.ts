import { CreateProductEvent } from '@apps/product/src/product/application/events/create-product.event';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';

import { PRODUCT_STATUS } from '@apps/product/src/product/domain/enum/product.enum';

describe('ProductEntity', () => {
    let product: Product;

    beforeEach(() => {
        product = new Product();
        product.product_id = 1;
        product.host_id = 123;
        product.product_name = '테스트 상품';
        product.product_content = '테스트 상품 설명';
        product.product_price = 100.5;
        product.product_stock = 10;
        product.product_status = PRODUCT_STATUS.PENDING;
    });

    it('createProduct 메소드 호출되면 CreateProductEvent를 적용한다.', () => {
        const applySpy = jest.spyOn(product, 'apply');

        product.createProduct();

        const appliedEvent = applySpy.mock.calls[0][0];
        expect(applySpy).toHaveBeenCalledWith(expect.any(CreateProductEvent));
        expect(appliedEvent).toBeInstanceOf(CreateProductEvent);
        expect(applySpy.mock.instances[0]).toEqual(product);
    });
});
