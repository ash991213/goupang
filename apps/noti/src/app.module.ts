import { Module } from '@nestjs/common';
import { NotiModule } from '@apps/noti/src/noti/noti.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [NotiModule, EnvConfigModule.forRoot([`apps/noti/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
