import { Injectable } from '@nestjs/common';
import { createClient, RedisClientOptions, RedisClientType, SetOptions } from 'redis';

import { ICacheService } from '@libs/module/cache/adapter';
import { CacheKeyArgument, CacheKeyValue, CacheValueArgument } from '@libs/module/cache/types';

import { ResException } from '@libs/util/res/res.exception';
import { REDIS_CONNECTION_FAILED, REDIS_DELETE_FAILED, REDIS_SET_EXPIRED_FAILED, REDIS_SET_FAILED } from '@libs/util/const/error.const';

@Injectable()
export class CacheService implements ICacheService {
    client: RedisClientType;

    constructor(private readonly config: RedisClientOptions) {
        this.client = createClient(this.config) as RedisClientType;
    }

    async isConnected(): Promise<void> {
        const ping = await this.client.ping();
        if (ping !== 'PONG') throw new ResException(REDIS_CONNECTION_FAILED);
    }

    async connect(): Promise<RedisClientType> {
        await this.client.connect();
        return this.client;
    }

    async set(key: CacheKeyArgument, value: CacheValueArgument, config?: SetOptions): Promise<void> {
        const setResult = await this.client.set(key, value, config || { EX: 3600 });
        if (setResult !== 'OK') throw new ResException(REDIS_SET_FAILED);
    }

    async get(key: CacheKeyArgument): Promise<string> {
        const getResult = await this.client.get(key);
        return getResult;
    }

    async del(key: CacheKeyArgument): Promise<void> {
        const deleted = await this.client.del(key);
        if (!deleted) throw new ResException(REDIS_DELETE_FAILED);
    }

    async setMulti(redisList: CacheKeyValue[]): Promise<void> {
        const multi = this.client.multi();

        for (const model of redisList) {
            multi.rPush(model.key, model.value);
        }

        await multi.exec();
    }

    async pExpire(key: CacheKeyArgument, milliseconds: number): Promise<void> {
        const expired = await this.client.pExpire(key, milliseconds);
        if (!expired) throw new ResException(REDIS_SET_EXPIRED_FAILED);
    }

    async hGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]> {
        return await this.client.hGet(key, field);
    }

    async hSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValueArgument): Promise<number> {
        return await this.client.hSet(key, field, value);
    }

    async hGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]> {
        return await this.client.hGetAll(key);
    }

    async scanKey(pattern: string): Promise<any[]> {
        const foundKeys = [];
        let cursor = 0;

        do {
            const reply = await this.client.scan(cursor, {
                MATCH: pattern,
                COUNT: 1000,
            });

            cursor = reply.cursor;
            foundKeys.push(...reply.keys);
        } while (cursor !== 0);

        return foundKeys;
    }
}
