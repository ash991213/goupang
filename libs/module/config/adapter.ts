export abstract class IEnvConfigService {
    NODE_ENV: string;

    LOG_LEVEL: string;
    LOG_LEVEL_DB: string;

    RDS_REGION: string;
    RDS_HOST: string;
    DATABASE_NAME: string;
    DATABASE_TYPE: string;

    WRITE_DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
    };

    READ_DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
    };

    PORT: {
        PRODUCT_PORT: number;
    };

    RPC_URL: {
        PRODUCT_RPC_URL: string;
    };

    REDIS_URL: string;
}
