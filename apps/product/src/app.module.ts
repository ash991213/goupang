import { Module } from '@nestjs/common';
import { ProductModule } from '@apps/product/src/product/product.module';
import { EnvConfigModule } from '@libs/module/config/config.module';

@Module({
    imports: [ProductModule, EnvConfigModule.forRoot([`apps/product/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'}`])],
    providers: [],
})
export class AppModule {}
