import { Module } from '@nestjs/common';
import { AuthModule } from '@apps/auth/src/auth/auth.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [AuthModule, EnvConfigModule.forRoot([`apps/auth/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
