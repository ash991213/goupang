import { Injectable } from '@nestjs/common';

import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';
import { IProductRepository } from '@apps/product/src/product/infrastructure/outbound/port/repository/product.repository.interface';

import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

@Injectable()
export class ProductService implements IProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async generateProductSku(hostId: number): Promise<string> {
        const productCount = await this.productRepository.getProductCountByHostId(hostId);
        return `H${hostId}-P${productCount + 1}`;
    }

    async createProduct(newProduct: CreateProductInnerDto) {
        return this.productRepository.createProduct(newProduct);
    }
}
