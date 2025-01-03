import { Inject, Injectable } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';

import { IEnvConfigService } from '@libs/module/config/adapter';
import { KafkaSaslEnum } from '@libs/module/kafka/kafka.type';

@Injectable()
export class KafkaConfigService {
    constructor(@Inject(IEnvConfigService) private readonly envConfigService: IEnvConfigService) {}

    getKafkaConfig(): KafkaOptions {
        const mechanism: string = KafkaSaslEnum[this.envConfigService.KAFKA.SASL_MECHANISMS];

        let saslOptions: any;

        if (mechanism === KafkaSaslEnum.PLAIN) {
            saslOptions = {
                mechanism: KafkaSaslEnum.PLAIN,
                username: this.envConfigService.KAFKA.SASL_PLAIN_USERNAME,
                password: this.envConfigService.KAFKA.SASL_PLAIN_PASSWORD,
            };
        } else {
            throw new Error(`Unsupported SASL mechanism: ${mechanism}`);
        }

        return {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: this.envConfigService.KAFKA.CLIENT_ID,
                    brokers: this.envConfigService.KAFKA.BROKER_ENDPOINT?.split(','),
                    ssl: false,
                    sasl: saslOptions,
                },
                consumer: { groupId: this.envConfigService.KAFKA.CONSUMER_GROUP_ID },
                producer: { allowAutoTopicCreation: true },
            },
        };
    }
}
