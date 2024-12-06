import { NestFactory } from '@nestjs/core';
import { AppModule } from '@apps/auth/src/app.module';
import { IEnvConfigService } from '@libs/module/config/adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(IEnvConfigService, { strict: false });
    console.log(configService.PORT.AUTH_PORT);
    console.log(configService.NODE_ENV);
    await app.listen(8000);
}
bootstrap();
