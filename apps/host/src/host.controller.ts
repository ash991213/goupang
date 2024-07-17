import { Controller, Get } from '@nestjs/common';
import { HostService } from '@apps/host/src/host.service';

@Controller()
export class HostController {
    constructor(private readonly hostService: HostService) {}

    @Get()
    getHello(): string {
        return this.hostService.getHello();
    }
}
