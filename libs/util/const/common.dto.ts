import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { USER_TYPE } from '@libs/util/const/enum.const';

export class UserDto {
    @Expose({ name: 'userId' })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @Expose({ name: 'userRole' })
    @IsEnum(USER_TYPE)
    @IsNotEmpty()
    userRole: number;
}
