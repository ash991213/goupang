import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { HostController } from '@apps/host/src/host/infrastructure/inbound/adapter/host.controller';
import { HostService } from '@apps/host/src/host/infrastructure/inbound/port/host.service';

import { Host } from '@apps/host/src/host/domain/entity/host.entity';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/host/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([Host])],
    controllers: [HostController],
    providers: [HostService],
})
export class HostModule {}
