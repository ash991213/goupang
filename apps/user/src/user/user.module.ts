import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { UserController } from '@apps/user/src/user/infrastructure/inbound/adapter/user.controller';
import { UserService } from '@apps/user/src/user/infrastructure/inbound/port/user.service';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/user/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
