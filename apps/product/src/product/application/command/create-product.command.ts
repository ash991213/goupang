import { ICommand } from '@nestjs/cqrs';
import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

export class CreateProductCommand implements ICommand {
    constructor(public readonly input: CreateProductReqDto) {}
}
