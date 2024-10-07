import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
    getHello(): string {
        return 'Host Workflow Test!!';
    }
}
