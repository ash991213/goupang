import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyAdminProductCreationCommand } from '@apps/product/src/product/application/command/notify-admin-product-creation.command';
import { IProduceService } from '@apps/product/src/product/infrastructure/outbound/port/messageQueue/product.produce.interface';

@CommandHandler(NotifyAdminProductCreationCommand)
export class NotifyAdminProductCreationCommandHandler implements ICommandHandler<NotifyAdminProductCreationCommand> {
    constructor(private readonly produceService: IProduceService) {}

    async execute(command: NotifyAdminProductCreationCommand): Promise<void> {
        const { input } = command;
        this.produceService.sendNotifyAdminProductCreation(input);
    }
}
