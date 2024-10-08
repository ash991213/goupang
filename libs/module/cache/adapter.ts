import { RedisClientType } from 'redis';

import { CacheKeyArgument, CacheKeyValue, CacheValueArgument } from '@libs/module/cache/types';

export abstract class ICacheService<T = RedisClientType> {
    abstract client: T;
    abstract isConnected(): Promise<void>;
    abstract connect(): Promise<T>;
    abstract set(key: CacheKeyArgument, value: CacheValueArgument, config?: unknown): Promise<void>;
    abstract del(key: CacheKeyArgument): Promise<void>;
    abstract get(key: CacheKeyArgument): Promise<string>;
    abstract setMulti(redisList: CacheKeyValue[]): Promise<void>;
    abstract pExpire(key: CacheKeyArgument, milliseconds: number): Promise<void>;
    abstract hGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]>;
    abstract hSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValueArgument): Promise<number>;
    abstract hGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]>;
    abstract scanKey(pattern: string): Promise<any[]>;
}
