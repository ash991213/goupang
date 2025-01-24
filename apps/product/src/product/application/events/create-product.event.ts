import { CreateProductReqDto } from '@apps/product/src/product/application/dtos/product.dto';

export class CreateProductEvent {
    constructor(public readonly input: CreateProductReqDto) {}
}
