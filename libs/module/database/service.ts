import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IDatabaseService } from '@libs/module/database/adapter';
import { ConnectionModel, GetAuthTokenParams } from '@libs/module/database/types';

import { Signer } from '@aws-sdk/rds-signer';

@Injectable()
export class DatabaseService implements IDatabaseService {
    async getAuthToken(authTokenParams: GetAuthTokenParams): Promise<string> {
        const { hostname, port, username, region } = authTokenParams;
        const signer = new Signer({
            hostname,
            port,
            username,
            region,
        });

        const token = await signer.getAuthToken();

        return token;
    }
    getDefaultConnection<T extends TypeOrmModuleOptions = TypeOrmModuleOptions>(config: ConnectionModel): T {
        return {
            name: config.name,
            type: config.type,
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            entities: config.entities,
            logging: config.logging,
            logger: config.logger,
            ssl: config.ssl,
        } as unknown as T;
    }
}
