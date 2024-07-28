import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentService {
    getHello(): string {
        return 'Hello World!';
    }
}
