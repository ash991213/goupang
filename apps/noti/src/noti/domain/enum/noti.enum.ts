export enum RECIPIENT_TYPE {
    USER = Symbol['USER'],
    HOST = Symbol['HOST'],
    ADMIN = Symbol['ADMIN'],
}

export enum NOTIFICATION_CHANNEL {
    EMAIL = Symbol['EMAIL'],
    SLACK = Symbol['SLACK'],
}

export enum NOTIFICATION_TYPE {
    PRODUCT = Symbol['PRODUCT'],
    ORDER = Symbol['ORDER'],
    SHIPMENT = Symbol['SHIPMENT'],
    PAYMENT = Symbol['PAYMENT'],
    ETC = Symbol['ETC'],
}

export enum NOTIFICATION_STATUS {
    PENDING = Symbol['PENDING'],
    SENT = Symbol['SENT'],
    FAILED = Symbol['FAILED'],
}
