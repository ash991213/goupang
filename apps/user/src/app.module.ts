import { Module } from '@nestjs/common';
import { UserModule } from '@apps/user/src/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
