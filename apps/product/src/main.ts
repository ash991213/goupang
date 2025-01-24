import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import { AppModule } from '@apps/product/src/app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

import { LoggingInterceptor } from '@libs/util/interceptor/logger.interceptor';

import { IEnvConfigService } from '@libs/module/config/adapter';
import { KafkaConfigService } from '@libs/module/kafka/kafka.service';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationErrorHandlingPipe } from '@libs/util/pipe/validation.pipe';
import { DefaultValuePipe } from '@libs/util/pipe/default-value.pipe';
import { AllExceptionsFilter } from '@libs/util/filter/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('Product API 문서').setDescription('Product API 문서입니다.').setVersion('1.0').addTag('products').build();
    const options: SwaggerDocumentOptions = { operationIdFactory: (controllerKey: string, methodKey: string) => methodKey };
    const documentFactory = () => SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, documentFactory);

    const configService = app.get(IEnvConfigService);
    const kafkaConfigService = app.get(KafkaConfigService);

    app.enableCors();

    app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalPipes(new ValidationErrorHandlingPipe(), new DefaultValuePipe());

    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

    app.connectMicroservice<MicroserviceOptions>(kafkaConfigService.getKafkaConfig());

    await app.startAllMicroservices();

    await app.listen(configService.PORT.PRODUCT_PORT);
}
bootstrap();
