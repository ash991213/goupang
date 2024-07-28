import { Module } from '@nestjs/common';
import { NotiController } from '@apps/noti/src/noti/infrastructure/inbound/adapter/noti.controller';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';

@Module({
    imports: [],
    controllers: [NotiController],
    providers: [NotiService],
})
export class NotiModule {}
