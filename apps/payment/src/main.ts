import { NestFactory } from '@nestjs/core';
import { PaymentModule } from '@apps/payment/src/payment.module';

async function bootstrap() {
    const app = await NestFactory.create(PaymentModule);
    await app.listen(3000);
}
bootstrap();
