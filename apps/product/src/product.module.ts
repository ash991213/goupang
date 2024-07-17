import { Module } from '@nestjs/common';
import { ProductController } from '@apps/product/src/product.controller';
import { ProductService } from '@apps/product/src/product.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
