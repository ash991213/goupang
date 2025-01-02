import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { IEnvConfigService } from '@libs/module/config/adapter';
import { KafkaConfigService } from '@libs/module/kafka/kafka.service';

import { AppModule } from '@apps/auth/src/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(IEnvConfigService, { strict: false });
    const kafkaConfigService = app.get(KafkaConfigService);

    app.connectMicroservice<MicroserviceOptions>(kafkaConfigService.getKafkaConfig());

    await app.startAllMicroservices();
    await app.listen(configService.PORT.AUTH_PORT);
}
bootstrap();
