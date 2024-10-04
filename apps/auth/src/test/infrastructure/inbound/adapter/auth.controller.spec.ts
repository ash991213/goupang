import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@apps/auth/src/auth/infrastructure/inbound/adapter/auth.controller';
import { AuthService } from '@apps/auth/src/auth/infrastructure/inbound/port/auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        authController = app.get<AuthController>(AuthController);
        authService = app.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('should return "Auth Workflow Test!!"', () => {
        expect(authController.getHello()).toBe('Auth Workflow Test!!');
        expect(authController.getHello()).toBe(authService.getHello());
    });
});
