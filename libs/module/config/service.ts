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
    LOG_LEVEL_DB = this.get<string>('LOG_LEVEL_DB');

    MASTER_DATABASE = {
        HOST: this.get<string>('MASTER_MYSQL_HOST'),
        PORT: this.get<number>('MASTER_MYSQL_PORT'),
        USER: this.get<string>('MASTER_MYSQL_USERNAME'),
        PASSWORD: this.get<string>('MASTER_MYSQL_PASSWORD'),
    };

    SLAVE_DATABASE = {
        HOST: this.get<string>('SLAVE_MYSQL_HOST'),
        PORT: this.get<number>('SLAVE_MYSQL_PORT'),
        USER: this.get<string>('SLAVE_MYSQL_USERNAME'),
        PASSWORD: this.get<string>('SLAVE_MYSQL_PASSWORD'),
    };

    PORT = {
        PRODUCT_PORT: this.get<number>('PRODUCT_PORT'),
    };

    RPC_URL = {
        PRODUCT_RPC_URL: this.get<string>('PRODUCT_RPC_URL'),
    };

    REDIS_URL = this.get<string>('REDIS_URL');
}
