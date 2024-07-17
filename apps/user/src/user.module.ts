import { Module } from '@nestjs/common';
import { UserController } from '@apps/user/src/user.controller';
import { UserService } from '@apps/user/src/user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
