import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";

@injectable()
export class CartsCache {
  constructor(
    @inject(TYPES.CacheProvider) private readonly cache: CacheProvider,
  ) {}

  async invalidate(userId: string): Promise<void> {
    await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
  }
}
