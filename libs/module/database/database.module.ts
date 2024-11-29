import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLoggerModule } from '@libs/module/database/typeorm-logger.module';

import { LogLevel } from 'typeorm';
import { GetAuthTokenParams } from '@libs/module/database/types';

import { DatabaseService } from '@libs/module/database/service';
import { IDatabaseService } from '@libs/module/database/adapter';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { IEnvConfigService } from '@libs/module/config/adapter';

@Module({})
export class DatabaseModule {
    static forRootAsync(entities: any[]) {
        const providers: Provider[] = [{ provide: IDatabaseService, useClass: DatabaseService }];

        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    name: 'clusterEndpoint',
                    imports: [EnvConfigModule.forRoot([])],
                    useFactory: async (envConfigService: IEnvConfigService) => {
                        const getAuthTokenParams: GetAuthTokenParams = {
                            hostname: envConfigService.WRITE_DATABASE.HOST,
                            port: envConfigService.WRITE_DATABASE.PORT,
                            username: envConfigService.WRITE_DATABASE.USER,
                            region: envConfigService.RDS_REGION,
                        };
                        const token = await new DatabaseService().getAuthToken(getAuthTokenParams);
                        const logLevel = envConfigService.LOG_LEVEL_DB.map((v) => {
                            return v as LogLevel;
                        });
                        return new DatabaseService().getDefaultConnection({
                            name: envConfigService.DATABASE_NAME,
                            type: envConfigService.DATABASE_TYPE,
                            host: envConfigService.WRITE_DATABASE.HOST,
                            port: envConfigService.WRITE_DATABASE.PORT,
                            user: envConfigService.WRITE_DATABASE.USER,
                            password: token,
                            database: envConfigService.DATABASE_NAME,
                            entities: entities,
                            logging: true,
                            logger: new TypeOrmLoggerModule(logLevel),
                        });
                    },
                    inject: [IEnvConfigService],
                }),
                TypeOrmModule.forRootAsync({
                    name: 'readerEndpoint',
                    imports: [EnvConfigModule.forRoot([])],
                    useFactory: async (envConfigService: IEnvConfigService) => {
                        const getAuthTokenParams: GetAuthTokenParams = {
                            hostname: envConfigService.READ_DATABASE.HOST,
                            port: envConfigService.READ_DATABASE.PORT,
                            username: envConfigService.READ_DATABASE.USER,
                            region: envConfigService.RDS_REGION,
                        };
                        const token = await new DatabaseService().getAuthToken(getAuthTokenParams);
                        const logLevel = envConfigService.LOG_LEVEL_DB.map((v) => {
                            return v as LogLevel;
                        });
                        return new DatabaseService().getDefaultConnection({
                            name: envConfigService.DATABASE_NAME,
                            type: envConfigService.DATABASE_TYPE,
                            host: envConfigService.READ_DATABASE.HOST,
                            port: envConfigService.READ_DATABASE.PORT,
                            user: envConfigService.READ_DATABASE.USER,
                            password: token,
                            database: envConfigService.DATABASE_NAME,
                            entities: entities,
                            logging: true,
                            logger: new TypeOrmLoggerModule(logLevel),
                        });
                    },
                    inject: [IEnvConfigService],
                }),
            ],
            providers,
            exports: providers,
        };
    }
}
