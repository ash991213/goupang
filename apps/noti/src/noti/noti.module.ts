import { Module } from '@nestjs/common';
import { NotiController } from '@apps/noti/src/noti/infrastructure/inbound/adapter/noti.controller';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/auth/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [NotiController],
    providers: [NotiService],
})
export class NotiModule {}
