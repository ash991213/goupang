import { Query } from '@nestjs/cqrs';
import { Product } from '@apps/product/src/product/domain/entity/product.entity';

export class GetProductDetailQuery extends Query<Product> {
    constructor(public readonly productId: number) {
        super();
    }
}
