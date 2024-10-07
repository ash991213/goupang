import { Module } from '@nestjs/common';
import { HostModule } from '@apps/host/src/host/host.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [HostModule, EnvConfigModule.forRoot([`apps/host/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
