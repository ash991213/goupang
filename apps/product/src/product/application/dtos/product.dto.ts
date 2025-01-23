import { Expose } from 'class-transformer';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@libs/util/page/page.dto';

class BaseProductDto {
    @ApiProperty({
        example: 1,
        description: '호스트 ID',
    })
    @Expose({ name: 'host_id' })
    @IsNumber()
    host_id: number;

    @ApiProperty({
        example: '예시 상품 이름',
        description: '상품 이름',
    })
    @Expose({ name: 'product_name' })
    @IsString()
    @MaxLength(100)
    product_name: string;

    @ApiProperty({
        example: '예시 상품 내용',
        description: '상품 내용',
    })
    @Expose({ name: 'product_content' })
    @IsString()
    product_content: string;

    @ApiProperty({
        example: 10000,
        description: '상품 가격',
    })
    @Expose({ name: 'product_price' })
    @Max(9999999999.99)
    @Min(0.01)
    @IsNumber()
    product_price: number;

    @ApiProperty({
        example: 50,
        description: '상품 재고',
    })
    @Expose({ name: 'product_stock' })
    @IsNumber()
    product_stock: number;
}

export class CreateProductReqDto extends BaseProductDto {}
export class CreateProductInnerDto extends BaseProductDto {
    @Expose({ name: 'product_sku' })
    @IsString()
    @MaxLength(50)
    product_sku: string;
}
