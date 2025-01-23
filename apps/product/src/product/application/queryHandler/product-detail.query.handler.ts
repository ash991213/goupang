import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductDetailQuery } from '@apps/product/src/product/application/query/product-detail.query';

import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';

@QueryHandler(GetProductDetailQuery)
export class GetProductDetailQueryHandler implements IQueryHandler<GetProductDetailQuery> {
    constructor(private readonly productService: IProductService) {}

    async execute(query: GetProductDetailQuery) {
        const { productId } = query;
        const product = this.productService.getProductDetail(productId);
        return product;
    }
}
