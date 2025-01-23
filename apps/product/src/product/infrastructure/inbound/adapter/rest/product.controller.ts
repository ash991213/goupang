import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { GetProductDetailQuery } from '@apps/product/src/product/application/query/product-detail.query';
import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';

import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

import { ResImpl } from '@libs/util/res/res.implement';
import { SUCCESS } from '@libs/util/const/error.const';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product API')
@Controller({ version: '1', path: 'api/product' })
export class ProductController {
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
    ) {}

    @Get(':productId')
    @ApiOperation({ summary: '상품 상세 조회', description: '상품 ID를 기반으로 상세 정보를 조회합니다.' })
    @ApiParam({
        name: 'productId',
        description: '조회할 상품의 고유 ID',
        required: true,
        example: 10,
    })
    @ApiResponse({ status: 200, description: '상품 상세 정보 반환 성공' })
    @ApiResponse({ status: 404, description: '상품을 찾을 수 없음' })
    async getProductDetail(@Param('productId') productId: number) {
        const product = await this.queryBus.execute(new GetProductDetailQuery(productId));
        return new ResImpl({ ...SUCCESS, data: { product } });
    }

    @Post()
    @ApiOperation({ summary: '신규 상품 등록', description: '신규 상품을 등록합니다.' })
    @ApiResponse({ status: 201, description: '신규 상품 등록 성공' })
    @ApiResponse({ status: 400, description: '신규 상품 등록 실패' })
    async createProduct(@Body() createProductDto: CreateProductReqDto) {
        const product = await this.commandBus.execute(new CreateProductCommand(createProductDto));
        return new ResImpl({ ...SUCCESS, data: { product } });
    }
}
