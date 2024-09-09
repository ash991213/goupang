import { NestFactory } from '@nestjs/core';
import { AppModule } from '@apps/user/src/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log('port :', process.env.PORT);
    await app.listen(process.env.PORT);
}
bootstrap();
