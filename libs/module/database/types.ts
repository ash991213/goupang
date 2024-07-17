import { TypeormLoggerModule } from '@libs/module/database/typeorm-logger.module';

import { CONNECTION_NAME, DATABASE_TYPE } from '@libs/module/database/enum';

export type ConnectionModel = {
    name: string;
    type: DATABASE_TYPE;
    host: string;
    port: string | number;
    user: string;
    password: string;
    database: CONNECTION_NAME;
    entities: any[];
    logging: boolean;
    logger: TypeormLoggerModule;
};
