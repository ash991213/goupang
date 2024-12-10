import { TypeOrmLoggerModule } from '@libs/module/database/typeorm-logger.module';

export type MySqlSslOptions = {
    ca: string | Buffer;
};

export type ConnectionModel = {
    name: string;
    type: string;
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
    entities: any[];
    logging: boolean;
    logger: TypeOrmLoggerModule;
    ssl: MySqlSslOptions;
};
