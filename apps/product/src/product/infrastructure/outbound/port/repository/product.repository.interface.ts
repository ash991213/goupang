import { Product } from '@apps/product/src/product/domain/entity/product.entity';
import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

export abstract class IProductRepository {
    abstract getProductCountByHostId(hostId: number): Promise<number>;
    abstract createProduct(createProductDto: CreateProductInnerDto): Promise<Product>;
}
