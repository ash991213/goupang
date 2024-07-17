import { LogLevel } from 'typeorm';

import { CONNECTION_NAME, DATABASE_TYPE } from '@libs/module/database/enum';

export interface DatabaseConnectionOptions {
    name: string;
    type: DATABASE_TYPE;
    host: string;
    port: number;
    user: string;
    password: string;
    database: CONNECTION_NAME;
    entities: any[];
    logging: boolean;
    logLevel: LogLevel[];
}
