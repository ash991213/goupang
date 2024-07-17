import { Expose, Type, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { PAGE, PAGE_LIMIT } from '@libs/util/page/page.const';

export class PaginationDto {
    @Expose({ name: 'page' })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @Min(1)
    page?: number = PAGE;

    @Expose({ name: 'limit' })
    @Type(() => Number)
    @Transform(() => 20)
    @IsNumber()
    @Min(20)
    limit?: number = PAGE_LIMIT;

    @Expose({ name: 'order' })
    @Transform(({ value }) => (value ? value.toUpperCase() : value))
    @IsEnum(['ASC', 'DESC'])
    @IsOptional()
    order?: 'ASC' | 'DESC' = 'DESC';
}
