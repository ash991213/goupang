import { LogLevel } from 'typeorm';
import { MySqlSslOptions } from '@libs/module/database/types';

export interface DatabaseConnectionOptions {
    name: string;
    type: string;
    host: string;
    port: number;
    username: string;
    database: string;
    region: string;
    entities: any[];
    logging: boolean;
    logLevel: LogLevel[];
    ssl: MySqlSslOptions;
}
