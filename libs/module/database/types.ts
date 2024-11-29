import { TypeOrmLoggerModule } from '@libs/module/database/typeorm-logger.module';

export type GetAuthTokenParams = {
    hostname: string;
    port: number;
    username: string;
    region: string;
};

export type ConnectionModel = {
    name: string;
    type: string;
    host: string;
    port: string | number;
    user: string;
    password: string;
    database: string;
    entities: any[];
    logging: boolean;
    logger: TypeOrmLoggerModule;
};
