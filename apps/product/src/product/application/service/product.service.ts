import { Injectable } from '@nestjs/common';

import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';
import { IProductRepository } from '@apps/product/src/product/infrastructure/outbound/port/repository/product.repository.interface';

import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResException } from '@libs/util/res/res.exception';
import { PRODUCT_CREATE_FAILED, PRODUCT_NOT_FOUND, PRODUCT_SELECT_FAILED, PRODUCT_SELECT_FAILED_BY_HOST_ID } from '@libs/util/const/error.const';

@Injectable()
export class ProductService implements IProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async getProductDetail(productId: number) {
        try {
            const productDetail = await this.productRepository.getProductDetail(productId);
            if (!productDetail) throw new ResException(PRODUCT_NOT_FOUND);
            return productDetail;
        } catch (e) {
            if (e instanceof ResException) throw e;
            throw new ResException(PRODUCT_SELECT_FAILED);
        }
    }

    async generateProductSku(hostId: number): Promise<string> {
        try {
            const productCount = await this.productRepository.getProductCountByHostId(hostId);
            return `H${hostId}-P${productCount + 1}`;
        } catch (e) {
            throw new ResException(PRODUCT_SELECT_FAILED_BY_HOST_ID);
        }
    }

    async createProduct(newProduct: CreateProductInnerDto) {
        try {
            return await this.productRepository.createProduct(newProduct);
        } catch (e) {
            throw new ResException(PRODUCT_CREATE_FAILED);
        }
    }
}
