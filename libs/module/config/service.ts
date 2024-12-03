import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvConfigService } from '@libs/module/config/adapter';

@Injectable()
export class EnvConfigService extends ConfigService implements IEnvConfigService {
    constructor() {
        super();
    }

    NODE_ENV = this.get<string>('NODE_ENV');

    LOG_LEVEL = this.get<string>('LOG_LEVEL');
    LOG_LEVEL_DB = this.get<string>('LOG_LEVEL_DB').split(',');

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
        PRODUCT_PORT: this.get<number>('PORT'),
    };

    RPC_URL = {
        PRODUCT_RPC_URL: this.get<string>('PRODUCT_RPC_URL'),
    };

    REDIS_URL = this.get<string>('REDIS_URL');
}
