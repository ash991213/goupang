import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionModel, GetAuthTokenParams } from '@libs/module/database/types';

export abstract class IDatabaseService {
    abstract getAuthToken(authTokenParams: GetAuthTokenParams): Promise<string>;
    abstract getDefaultConnection<T = TypeOrmModuleOptions>(options?: ConnectionModel): T;
}
