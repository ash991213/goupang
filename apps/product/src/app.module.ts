import { Module } from '@nestjs/common';
import { ProductModule } from '@apps/product/src/product/product.module';

@Module({
    imports: [ProductModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
