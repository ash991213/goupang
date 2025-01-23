import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { GetProductDetailQuery } from '@apps/product/src/product/application/query/product-detail.query';
import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';

import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResImpl } from '@libs/util/res/res.implement';
import { SUCCESS } from '@libs/util/const/error.const';

@Controller({ version: '1', path: 'api/product' })
export class ProductController {
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
    ) {}

    @Get(':productId')
    async getProductDetail(@Param('productId') productId: number) {
        const product = await this.queryBus.execute(new GetProductDetailQuery(productId));
        return new ResImpl({ ...SUCCESS, data: { product } });
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductReqDto) {
        const product = await this.commandBus.execute(new CreateProductCommand(createProductDto));
        return new ResImpl({ ...SUCCESS, data: { product } });
    }
}
