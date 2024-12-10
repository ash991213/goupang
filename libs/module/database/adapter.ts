import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SignerConfig } from '@aws-sdk/rds-signer';
import { ConnectionModel } from '@libs/module/database/types';

export abstract class IDatabaseService {
    abstract getAuthToken(signerConfig: SignerConfig): Promise<string>;
    abstract getDefaultConnection<T = TypeOrmModuleOptions>(options?: ConnectionModel): T;
}
