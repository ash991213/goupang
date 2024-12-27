import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

import { KafkaSaslEnum } from './kafka.type';

@Injectable()
export class KafkaConfigService {
    constructor(private readonly configService: ConfigService) {}

    getKafkaConfig(): KafkaOptions {
        const mechanism: string = KafkaSaslEnum[this.configService.get<string>('KAFKA_SASL_MECHANISMS')];

        let saslOptions: any;

        if (mechanism === KafkaSaslEnum.PLAIN) {
            saslOptions = {
                mechanism: KafkaSaslEnum.PLAIN,
                username: this.configService.get<string>('KAFKA_SASL_PLAIN_USERNAME'),
                password: this.configService.get<string>('KAFKA_SASL_PLAIN_PASSWORD'),
            };
        } else {
            throw new Error(`Unsupported SASL mechanism: ${mechanism}`);
        }

        return {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: this.configService.get<string>('KAFKA_CLIENT_ID'),
                    brokers: this.configService.get<string>('KAFKA_BROKER_ENDPOINT')?.split(','),
                    ssl: false,
                    sasl: saslOptions,
                },
                consumer: { groupId: this.configService.get<string>('KAFKA_CONSUMER_GROUP_ID') },
                producer: { allowAutoTopicCreation: true },
            },
        };
    }
}
