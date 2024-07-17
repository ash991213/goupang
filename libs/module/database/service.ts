import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IDataBaseService } from '@libs/module/database/adapter';
import { ConnectionModel } from '@libs/module/database/types';

@Injectable()
export class DataBaseService implements IDataBaseService {
    getDefaultConnection<T extends TypeOrmModuleOptions = TypeOrmModuleOptions>(config: ConnectionModel): T {
        return {
            name: config.name,
            type: config.type,
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
            entities: config.entities,
            logging: config.logging,
            logger: config.logger,
        } as unknown as T;
    }
}
