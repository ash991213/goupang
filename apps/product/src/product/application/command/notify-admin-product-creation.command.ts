import { ICommand } from '@nestjs/cqrs';
import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';

export class NotifyAdminProductCreationCommand implements ICommand {
    constructor(public readonly input: SendProductCreationNotiDto) {}
}
