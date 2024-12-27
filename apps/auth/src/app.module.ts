import { Module } from '@nestjs/common';
import { AuthModule } from '@apps/auth/src/auth/auth.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [EnvConfigModule, DatabaseModule, AuthModule],
    providers: [],
})
export class AppModule {}
