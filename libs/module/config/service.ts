import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvConfigService } from '@libs/module/config/adapter';

@Injectable()
export class EnvConfigService extends ConfigService implements IEnvConfigService {
    constructor() {
        super();
    }

    NODE_ENV = this.get<string>('NODE_ENV');

    AWS_ACCESS_KEY = this.get<string>('AWS_ACCESS_KEY');
    AWS_SECRET_KEY = this.get<string>('AWS_SECRET_KEY');

    LOG_LEVEL = this.get<string>('LOG_LEVEL');
    LOG_LEVEL_DB = this.get<string>('LOG_LEVEL_DB');

    RDS_REGION = this.get<string>('RDS_REGION');
    RDS_HOST = this.get<string>('RDS_HOST');
    DATABASE_NAME = this.get<string>('DATABASE_NAME');
    DATABASE_TYPE = this.get<string>('DATABASE_TYPE');

    WRITE_DATABASE = {
        HOST: this.get<string>('WRITE_DATABASE_HOST'),
        PORT: this.get<number>('WRITE_DATABASE_PORT'),
        USER: this.get<string>('WRITE_DATABASE_USER'),
    };

    READ_DATABASE = {
        HOST: this.get<string>('READ_DATABASE_HOST'),
        PORT: this.get<number>('READ_DATABASE_PORT'),
        USER: this.get<string>('READ_DATABASE_USER'),
    };

    PORT = {
        AUTH_PORT: this.get<number>('AUTH_PORT'),
        HOST_PORT: this.get<number>('HOST_PORT'),
        NOTI_PORT: this.get<number>('NOTI_PORT'),
        ORDER_PORT: this.get<number>('ORDER_PORT'),
        PAYMENT_PORT: this.get<number>('PAYMENT_PORT'),
        PRODUCT_PORT: this.get<number>('PRODUCT_PORT'),
        SHIPMENT_PORT: this.get<number>('SHIPMENT_PORT'),
        USER_PORT: this.get<number>('USER_PORT'),
    };

    RPC_URL = {
        PRODUCT_RPC_URL: this.get<string>('PRODUCT_RPC_URL'),
    };

    REDIS_URL = this.get<string>('REDIS_URL');

    KAFKA = {
        BROKER_ENDPOINT: this.get<string>('KAFKA_BROKER_ENDPOINT'),
        SASL_MECHANISMS: this.get<string>('KAFKA_SASL_MECHANISMS'),
        SASL_PLAIN_USERNAME: this.get<string>('KAFKA_SASL_PLAIN_USERNAME'),
        SASL_PLAIN_PASSWORD: this.get<string>('KAFKA_SASL_PLAIN_PASSWORD'),
        CLIENT_ID: this.get<string>('KAFKA_CLIENT_ID'),
        CONSUMER_GROUP_ID: this.get<string>('KAFKA_CONSUMER_GROUP_ID'),
    };
}
