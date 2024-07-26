import { Module } from '@nestjs/common';
import { ProductController } from '@apps/product/src/product/infrastructure/inbound/adapter/product.controller';
import { ProductService } from '@apps/product/src/product/infrastructure/inbound/port/product.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
