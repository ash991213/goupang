import { Module } from '@nestjs/common';
import { NotiController } from '@apps/noti/src/noti.controller';
import { NotiService } from '@apps/noti/src/noti.service';

@Module({
    imports: [],
    controllers: [NotiController],
    providers: [NotiService],
})
export class NotiModule {}
