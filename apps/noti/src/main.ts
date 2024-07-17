import { NestFactory } from '@nestjs/core';
import { NotiModule } from '@apps/noti/src/noti.module';

async function bootstrap() {
    const app = await NestFactory.create(NotiModule);
    await app.listen(3000);
}
bootstrap();
