import { Module } from '@nestjs/common';
import { UserModule } from '@apps/user/src/user/user.module';
import { EnvConfigModule } from 'libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [UserModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
