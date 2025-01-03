export abstract class IEnvConfigService {
    NODE_ENV: string;

    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;

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
        AUTH_PORT: number;
        HOST_PORT: number;
        NOTI_PORT: number;
        ORDER_PORT: number;
        PAYMENT_PORT: number;
        PRODUCT_PORT: number;
        SHIPMENT_PORT: number;
        USER_PORT: number;
    };

    RPC_URL: {
        PRODUCT_RPC_URL: string;
    };

    REDIS_URL: string;

    KAFKA: {
        BROKER_ENDPOINT: string;
        SASL_MECHANISMS: string;
        SASL_PLAIN_USERNAME: string;
        SASL_PLAIN_PASSWORD: string;
        CLIENT_ID: string;
        CONSUMER_GROUP_ID: string;
    };
}
