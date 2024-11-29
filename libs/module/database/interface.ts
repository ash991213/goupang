import { LogLevel } from 'typeorm';

export interface DatabaseConnectionOptions {
    name: string;
    type: string;
    host: string;
    port: number;
    user: string;
    database: string;
    region: string;
    entities: any[];
    logging: boolean;
    logLevel: LogLevel[];
}
