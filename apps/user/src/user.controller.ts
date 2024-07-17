import { Controller, Get } from '@nestjs/common';
import { UserService } from '@apps/user/src/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }
}
