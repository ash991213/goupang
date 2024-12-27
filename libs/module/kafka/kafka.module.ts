import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { KafkaConfigService } from './kafka.service';

@Module({
    imports: [
        NestConfigModule,
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_SERVICE',
                extraProviders: [KafkaConfigService],
                inject: [KafkaConfigService],
                useFactory: (kafkaConfigService: KafkaConfigService) => kafkaConfigService.getKafkaConfig(),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class KafkaModule {}