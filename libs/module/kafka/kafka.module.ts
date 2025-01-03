import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { EnvConfigModule } from '@libs/module/config/config.module';
import { KafkaConfigService } from '@libs/module/kafka/kafka.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_SERVICE',
                imports: [EnvConfigModule.forRoot()],
                extraProviders: [KafkaConfigService],
                inject: [KafkaConfigService],
                useFactory: (kafkaConfigService: KafkaConfigService) => kafkaConfigService.getKafkaConfig(),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class KafkaModule {}
