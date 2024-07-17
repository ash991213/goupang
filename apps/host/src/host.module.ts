import { Module } from '@nestjs/common';
import { HostController } from '@apps/host/src/host.controller';
import { HostService } from '@apps/host/src/host.service';

@Module({
    imports: [],
    controllers: [HostController],
    providers: [HostService],
})
export class HostModule {}
