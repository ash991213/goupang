import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateProductEvent } from '@apps/product/src/product/application/events/create-product.event';
import { NotifyAdminProductCreationCommand } from '@apps/product/src/product/application/command/notify-admin-product-creation.command';
import { SendProductCreationNotiDto } from '@apps/product/src/product/application/dtos/send-product-creation-noti.dto';
import { NOTI_TYPE } from '@apps/product/src/product/domain/enum/product.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateProductSaga {
    @Saga()
    productCreated = (events$: Observable<any>): Observable<NotifyAdminProductCreationCommand> => {
        return events$.pipe(
            ofType(CreateProductEvent),
            map((event) => {
                const { input } = event;
                const notificationData = plainToInstance(SendProductCreationNotiDto, { ...input, noti_type: NOTI_TYPE.EMAIL }, { excludeExtraneousValues: true });
                return new NotifyAdminProductCreationCommand(notificationData);
            }),
        );
    };
}
