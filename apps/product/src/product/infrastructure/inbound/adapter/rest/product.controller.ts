import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';

import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResImpl } from '@libs/util/res/res.implement';
import { SUCCESS } from '@libs/util/const/error.const';

@Controller({ version: '1', path: 'api/product' })
export class ProductController {
    constructor(private commandBus: CommandBus) {}

    @Post()
    async createProduct(@Body() createProductDto: CreateProductReqDto) {
        const product = await this.commandBus.execute(new CreateProductCommand(createProductDto));
        return new ResImpl({ ...SUCCESS, data: { product } });
    }
}
