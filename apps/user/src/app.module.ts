import { Module } from '@nestjs/common';
import { UserModule } from '@apps/user/src/user/user.module';
import { EnvConfigModule } from 'libs/module/config/config.module';

@Module({
    imports: [UserModule, EnvConfigModule.forRoot([`apps/user/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
