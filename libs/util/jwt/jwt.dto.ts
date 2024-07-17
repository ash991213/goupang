import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInstance, IsNumber, IsString, IsNotEmpty } from 'class-validator';

import { JWT_TYPE } from '@libs/util/const/enum.const';

export class JwtDto {
    @Expose({ name: 'id' })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Expose({ name: 'iat' })
    @Type(() => Number)
    @IsNumber()
    iat: number;

    @Expose({ name: 'exp' })
    @Type(() => Number)
    @IsNumber()
    exp: number;

    @Expose({ name: 'token_type' })
    @IsEnum(JWT_TYPE)
    token_type: JWT_TYPE;
}

export class JwtTokenDto {
    @Expose({ name: 'token' })
    @IsString()
    token: string;

    @Expose({ name: 'payload' })
    @IsInstance(JwtDto)
    payload: JwtDto;
}
