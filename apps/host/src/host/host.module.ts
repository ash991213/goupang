import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { HostController } from '@apps/host/src/host/infrastructure/inbound/adapter/host.controller';
import { HostService } from '@apps/host/src/host/infrastructure/inbound/port/host.service';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/host/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [HostController],
    providers: [HostService],
})
export class HostModule {}
