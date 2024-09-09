import { NestFactory } from '@nestjs/core';
import { AppModule } from '@apps/user/src/app.module';
import { IEnvConfigService } from '@libs/module/config/adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(IEnvConfigService, { strict: false });
    await app.listen(configService.PORT.PRODUCT_PORT);
}
bootstrap();
