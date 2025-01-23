import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IProductRepository } from '@apps/product/src/product/infrastructure/outbound/port/repository/product.repository.interface';

import { Product } from '@apps/product/src/product/domain/entity/product.entity';
import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
    private readonly masterProductRepository: Repository<Product>;
    private readonly slaveProductRepository: Repository<Product>;

    constructor(
        @InjectDataSource('clusterEndpoint')
        private readonly masterDataSource: DataSource,
        @InjectDataSource('readerEndpoint')
        private readonly slaveDataSource: DataSource,
    ) {
        this.masterProductRepository = this.masterDataSource.getRepository(Product);
        this.slaveProductRepository = this.slaveDataSource.getRepository(Product);
    }

    async getProductCountByHostId(hostId: number) {
        return this.slaveProductRepository.count({
            where: { host_id: hostId },
        });
    }

    async createProduct(createProductDto: CreateProductInnerDto): Promise<Product> {
        const newProduct = this.masterProductRepository.create(createProductDto);
        await this.masterProductRepository.save(newProduct);
        return newProduct;
    }
}
