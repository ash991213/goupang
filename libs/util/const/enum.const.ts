export enum USER_TYPE {
    USER = 'USER',
    HOST = 'HOST',
    ADMIN = 'ADMIN',
}

export enum JWT_TYPE {
    ACCESS = Symbol['ACCESS'],
    REFRESH = Symbol['REFRESH'],
}
