import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { NotiController } from '@apps/noti/src/noti/infrastructure/inbound/adapter/noti.controller';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';

import { Notification } from '@apps/noti/src/noti/domain/entity/noti.entity';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/noti/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Notification])],
    controllers: [NotiController],
    providers: [NotiService],
})
export class NotiModule {}
