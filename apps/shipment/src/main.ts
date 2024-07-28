import { NestFactory } from '@nestjs/core';
import { ShipmentModule } from '@apps/shipment/src/shipment/shipment.module';

async function bootstrap() {
    const app = await NestFactory.create(ShipmentModule);
    await app.listen(3000);
}
bootstrap();
