import { Module } from '@nestjs/common';

import { CacheService } from '@libs/module/cache/service';
import { EnvConfigModule } from '@libs/module/config/config.module';

import { ICacheService } from '@libs/module/cache/adapter';
import { IEnvConfigService } from '@libs/module/config/adapter';

@Module({
    imports: [EnvConfigModule],
    providers: [
        {
            provide: ICacheService,
            useFactory: async (configService: IEnvConfigService) => {
                const cacheService = new CacheService({ url: configService.REDIS_URL });
                await cacheService.connect();
                return cacheService;
            },
            inject: [IEnvConfigService],
        },
    ],
    exports: [ICacheService],
})
export class CacheModule {}
