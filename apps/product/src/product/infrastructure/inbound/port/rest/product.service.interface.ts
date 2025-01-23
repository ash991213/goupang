import { Product } from '@apps/product/src/product/domain/entity/product.entity';
import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

export abstract class IProductService {
    abstract getProductDetail(productId: number): Promise<Product>;
    abstract generateProductSku(hostId: number): Promise<string>;
    abstract createProduct(newProduct: CreateProductInnerDto): Promise<Product>;
}
