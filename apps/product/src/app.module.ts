import { Module } from '@nestjs/common';
import { ProductModule } from '@apps/product/src/product/product.module';
import { EnvConfigModule } from '@libs/module/config/config.module';
import { DatabaseModule } from '@libs/module/database/database.module';

@Module({
    imports: [ProductModule, EnvConfigModule, DatabaseModule],
    providers: [],
})
export class AppModule {}
