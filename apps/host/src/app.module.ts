import { Module } from '@nestjs/common';
import { HostModule } from '@apps/host/src/host/host.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [HostModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
