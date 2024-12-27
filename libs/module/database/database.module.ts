import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLoggerModule } from '@libs/module/database/typeorm-logger.module';

import { LogLevel } from 'typeorm';
import { SignerConfig } from '@aws-sdk/rds-signer';

import { DatabaseService } from '@libs/module/database/service';
import { IDatabaseService } from '@libs/module/database/adapter';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { IEnvConfigService } from '@libs/module/config/adapter';
import { EnvConfigService } from '@libs/module/config/service';

import { readFileSync } from 'fs';
import { join } from 'path';

@Module({})
export class DatabaseModule {
    static forRootAsync(entities: any[]): DynamicModule {
        const providers: Provider[] = [{ provide: IDatabaseService, useClass: DatabaseService }];

        const createDatabaseConnection = async (envConfigService: IEnvConfigService, endpointType: 'WRITE_DATABASE' | 'READ_DATABASE', name: string) => {
            const databaseConfig = envConfigService[endpointType];
            const signerConfig: SignerConfig = {
                credentials: {
                    accessKeyId: envConfigService.AWS_ACCESS_KEY,
                    secretAccessKey: envConfigService.AWS_SECRET_KEY,
                },
                hostname: envConfigService.RDS_HOST,
                port: databaseConfig.PORT,
                username: databaseConfig.USER,
                region: envConfigService.RDS_REGION,
            };
            const token = await new DatabaseService().getAuthToken(signerConfig);

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
                    ca: readFileSync(join(process.cwd(), 'libs/module/database/goupang.pem')),
                },
            });
        };

        return {
            module: DatabaseModule,
            imports: [
                EnvConfigModule.forRoot([]),
                TypeOrmModule.forRootAsync({
                    name: 'clusterEndpoint',
                    extraProviders: [EnvConfigService],
                    imports: [EnvConfigModule.forRoot([])],
                    useFactory: async (envConfigService: IEnvConfigService) => createDatabaseConnection(envConfigService, 'WRITE_DATABASE', 'clusterEndpoint'),
                    inject: [IEnvConfigService],
                }),
                TypeOrmModule.forRootAsync({
                    name: 'readerEndpoint',
                    extraProviders: [EnvConfigService],
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
