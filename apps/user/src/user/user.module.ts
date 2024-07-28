import { Module } from '@nestjs/common';
import { UserController } from '@apps/user/src/user/infrastructure/inbound/adapter/user.controller';
import { UserService } from '@apps/user/src/user/infrastructure/inbound/port/user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
