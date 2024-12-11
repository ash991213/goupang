import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@apps/auth/src/auth/infrastructure/inbound/port/auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return "Auth Workflow Test!!"', () => {
        expect(service.getHello()).toBe('Auth Workflow Test!!');
    });
});
