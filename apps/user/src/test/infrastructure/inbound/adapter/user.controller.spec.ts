import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@apps/user/src/user/infrastructure/inbound/adapter/user.controller';
import { UserService } from '@apps/user/src/user/infrastructure/inbound/port/user.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = app.get<UserController>(UserController);
        userService = app.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    it('should return "User Workflow Test!!"', () => {
        expect(userController.getHello()).toBe('User Workflow Test!!');
        expect(userController.getHello()).toBe(userService.getHello());
    });
});
