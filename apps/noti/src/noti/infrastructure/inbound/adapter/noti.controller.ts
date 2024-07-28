import { Controller, Get } from '@nestjs/common';
import { NotiService } from '@apps/noti/src/noti/infrastructure/inbound/port/noti.service';

@Controller()
export class NotiController {
    constructor(private readonly notiService: NotiService) {}

    @Get()
    getHello(): string {
        return this.notiService.getHello();
    }
}
