import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';

import { JwtDto, JwtTokenDto } from '@libs/util/jwt/jwt.dto';

export const JwtRequest = createParamDecorator((CLS: ClassConstructor<JwtTokenDto>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    // TODO : header 내용 (user_id, user_role)
    const token: string = request.headers ? (request.headers.authorization ? request.headers.authorization.split('')[1] : undefined) : undefined;
    const jwt: JwtDto = request.user ? plainToInstance(JwtDto, request.user, { excludeExtraneousValues: true, exposeUnsetFields: false }) : undefined;

    return plainToInstance(CLS, { token, jwt }, { excludeExtraneousValues: true, exposeUnsetFields: false });
});
