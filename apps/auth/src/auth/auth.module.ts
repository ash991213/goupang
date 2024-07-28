import { Module } from '@nestjs/common';
import { AuthController } from '@apps/auth/src/auth/infrastructure/inbound/adapter/auth.controller';
import { AuthService } from '@apps/auth/src/auth/infrastructure/inbound/port/auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
