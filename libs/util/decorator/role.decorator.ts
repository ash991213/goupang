import { SetMetadata } from '@nestjs/common';

import { USER_TYPE } from '@libs/util/const/enum.const';

export type AllowedRole = USER_TYPE.USER | USER_TYPE.HOST | USER_TYPE.ADMIN;
export const Role = (roles: AllowedRole[]) => SetMetadata('roles', roles);
