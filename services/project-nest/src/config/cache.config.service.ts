import { CacheOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

export const CacheConfigFactory = async (): Promise<CacheOptions> => ({
    store: await redisStore({ ttl: 10 * 1000 }),
});
