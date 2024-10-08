import { Controller, Get } from '@nestjs/common';
import { ProductService } from '@apps/product/src/product/infrastructure/inbound/port/product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getHello(): string {
        return this.productService.getHello();
    }
}
