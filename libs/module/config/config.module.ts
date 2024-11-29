import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IEnvConfigService } from '@libs/module/config/adapter';
import { EnvConfigService } from '@libs/module/config/service';

@Module({})
export class EnvConfigModule {
    static forRoot(additionalEnvPaths: string[] = []): DynamicModule {
        const defaultEnvPath = `libs/module/config/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`;
        const envFilePaths = [defaultEnvPath, ...additionalEnvPaths];

        return {
            module: EnvConfigModule,
            imports: [
                ConfigModule.forRoot({
                    envFilePath: envFilePaths,
                    isGlobal: true,
                    cache: true,
                }),
            ],
            providers: [
                {
                    provide: IEnvConfigService,
                    useClass: EnvConfigService,
                },
            ],
            exports: [IEnvConfigService],
        };
    }
}
