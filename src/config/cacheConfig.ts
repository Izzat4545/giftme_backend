import { CacheModuleAsyncOptions, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

export const cacheConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: 'localhost',
        port: 6379,
      },
    });

    return {
      store: store as unknown as CacheStore,
      ttl: 10 * 60000, //10 minutes
    };
  },
};
