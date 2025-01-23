import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '@apps/product/src/product/application/command/create-product.command';
import { IProductService } from '@apps/product/src/product/infrastructure/inbound/port/rest/product.service.interface';
import { plainToInstance } from 'class-transformer';
import { CreateProductInnerDto } from '@apps/product/src/product/application/dtos/product.dto';
import { Product } from '@apps/product/src/product/domain/entity/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        private readonly productService: IProductService,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: CreateProductCommand): Promise<Product> {
        const { input } = command;
        // mergeObjectContext - 생성된 엔티티를 이벤트 퍼블리셔와 연결하여 해당 엔티티에서 호출되는 apply() 메소드를 통해 이벤트를 추적할 수 있도록 한다.
        const productSku = await this.productService.generateProductSku(input.host_id);
        const productCreationData = plainToInstance(CreateProductInnerDto, { product_sku: productSku, ...input }, { excludeExtraneousValues: true });
        const product = this.publisher.mergeObjectContext(await this.productService.createProduct(productCreationData));
        product.createProduct();
        product.commit();
        return product;
    }
}
