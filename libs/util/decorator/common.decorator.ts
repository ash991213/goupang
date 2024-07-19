import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { plainToInstance, ClassConstructor } from 'class-transformer';
import { UserDto } from '@libs/util/const/common.dto';

import { ResException } from '@libs/util/res/res.exception';
import { USER_HEADER_NOT_FOUND, INVALID_HEADER_USER_ID } from '@libs/util/const/error.const';

export const UserHeaders = createParamDecorator((CLS: ClassConstructor<UserDto>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const { 'x-user-id': userId, 'x-user-role': userRole } = headers;

    if (!userId || !userRole) {
        throw new ResException(USER_HEADER_NOT_FOUND);
    }

    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
        throw new ResException(INVALID_HEADER_USER_ID);
    }

    return plainToInstance(CLS, { userId, userRole }, { excludeExtraneousValues: true, exposeUnsetFields: false });
});
