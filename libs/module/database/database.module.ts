import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormLoggerModule } from '@libs/module/database/typeorm-logger.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

import { DataBaseService } from '@libs/module/database/service';
import { IDataBaseService } from '@libs/module/database/adapter';
import { IEnvConfigService } from '@libs/module/config/adapter';

import { DatabaseConnectionOptions } from '@libs/module/database/interface';

@Module({})
export class DatabaseModule {
    static forRoot(connectionOptions: DatabaseConnectionOptions): DynamicModule {
        const providers: Provider[] = [
            {
                provide: IDataBaseService,
                useClass: DataBaseService,
            },
        ];

        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    name: connectionOptions.name,
                    imports: [EnvConfigModule],
                    useFactory: async () => {
                        const { name, type, host, port, user, password, database, entities, logging, logLevel } = connectionOptions;
                        return new DataBaseService().getDefaultConnection({
                            name,
                            type,
                            host,
                            port,
                            user,
                            password,
                            database,
                            entities,
                            logging,
                            logger: new TypeormLoggerModule(logLevel),
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
