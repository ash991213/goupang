import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionModel } from '@libs/module/database/types';

export abstract class IDataBaseService {
    abstract getDefaultConnection<T = TypeOrmModuleOptions>(options?: ConnectionModel): T;
}
