export abstract class IEnvConfigService {
    NODE_ENV: string;

    LOG_LEVEL: string;
    LOG_LEVEL_DB: string;

    MASTER_DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
    };

    SLAVE_DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
    };

    PORT: {
        PRODUCT_PORT: number;
    };

    RPC_URL: {
        PRODUCT_RPC_URL: string;
    };

    REDIS_URL: string;
}
