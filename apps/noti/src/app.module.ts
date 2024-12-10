import { Module } from '@nestjs/common';
import { NotiModule } from '@apps/noti/src/noti/noti.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [NotiModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
