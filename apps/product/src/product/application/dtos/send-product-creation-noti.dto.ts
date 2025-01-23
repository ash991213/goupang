import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { NOTI_TYPE } from '@apps/product/src/product/domain/enum/product.enum';

export class SendProductCreationNotiDto {
    @Expose({ name: 'noti_type' })
    @IsEnum(NOTI_TYPE)
    noti_type: NOTI_TYPE;

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
