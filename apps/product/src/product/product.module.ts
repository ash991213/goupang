import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

import { ProductController } from '@apps/product/src/product/infrastructure/inbound/adapter/product.controller';
import { ProductService } from '@apps/product/src/product/infrastructure/inbound/port/product.service';

@Module({
    imports: [EnvConfigModule.forRoot([`apps/product/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`]), DatabaseModule.forRootAsync([])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
