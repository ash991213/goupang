import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLoggerModule } from '@libs/module/database/typeorm-logger.module';

import { LogLevel } from 'typeorm';
import { GetAuthTokenParams } from '@libs/module/database/types';

import { DatabaseService } from '@libs/module/database/service';
import { IDatabaseService } from '@libs/module/database/adapter';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { IEnvConfigService } from '@libs/module/config/adapter';

import { readFileSync } from 'fs';
import { join } from 'path';

@Module({})
export class DatabaseModule {
    static forRootAsync(entities: any[]) {
        const providers: Provider[] = [{ provide: IDatabaseService, useClass: DatabaseService }];

        const createDatabaseConnection = async (envConfigService: IEnvConfigService, endpointType: 'WRITE_DATABASE' | 'READ_DATABASE', name: string) => {
            const databaseConfig = envConfigService[endpointType];
            const getAuthTokenParams: GetAuthTokenParams = {
                hostname: envConfigService.RDS_HOST,
                port: databaseConfig.PORT,
                username: databaseConfig.USER,
                region: envConfigService.RDS_REGION,
            };
            const token = await new DatabaseService().getAuthToken(getAuthTokenParams);

            const logLevel = (envConfigService.LOG_LEVEL_DB.split(',') || ['schema', 'query', 'error', 'warn', 'info', 'log', 'migration']).map((v) => v as LogLevel);

            return new DatabaseService().getDefaultConnection({
                name,
                type: envConfigService.DATABASE_TYPE,
                host: databaseConfig.HOST,
                port: databaseConfig.PORT,
                username: databaseConfig.USER,
                password: token,
                database: envConfigService.DATABASE_NAME,
                entities: entities,
                logging: true,
                logger: new TypeOrmLoggerModule(logLevel),
                ssl: {
                    ca: readFileSync(join(process.cwd(), 'libs/module/database/ap-northeast-2-bundle.pem')),
                },
            });
        };

        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    name: 'clusterEndpoint',
                    imports: [EnvConfigModule.forRoot([])],
                    useFactory: async (envConfigService: IEnvConfigService) => createDatabaseConnection(envConfigService, 'WRITE_DATABASE', 'clusterEndpoint'),
                    inject: [IEnvConfigService],
                }),
                TypeOrmModule.forRootAsync({
                    name: 'readerEndpoint',
                    imports: [EnvConfigModule.forRoot([])],
                    useFactory: async (envConfigService: IEnvConfigService) => createDatabaseConnection(envConfigService, 'READ_DATABASE', 'readerEndpoint'),
                    inject: [IEnvConfigService],
                }),
            ],
            providers,
            exports: providers,
        };
    }
}
