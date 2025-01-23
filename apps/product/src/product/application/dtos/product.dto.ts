import { Expose } from 'class-transformer';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { PaginationDto } from '@libs/util/page/page.dto';

class BaseProductDto {
    @Expose({ name: 'host_id' })
    @IsNumber()
    host_id: number;

    @Expose({ name: 'product_name' })
    @IsString()
    @MaxLength(100)
    product_name: string;

    @Expose({ name: 'product_content' })
    @IsString()
    product_content: string;

    @Expose({ name: 'product_price' })
    @Max(9999999999.99)
    @Min(0.01)
    @IsNumber()
    product_price: number;

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
