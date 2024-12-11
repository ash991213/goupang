import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { AuthController } from '@apps/auth/src/auth/infrastructure/inbound/adapter/auth.controller';
import { AuthService } from '@apps/auth/src/auth/infrastructure/inbound/port/auth.service';

import { Auth } from '@apps/auth/src/auth/domain/entity/auth.entity';

@Module({
    // imports: [EnvConfigModule.forRoot([`apps/auth/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Auth])],
    imports: [EnvConfigModule.forRoot([`apps/auth/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
