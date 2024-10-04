import { Injectable } from '@nestjs/common';

@Injectable()
export class NotiService {
    getHello(): string {
        return 'Noti Workflow Test!';
    }
}
