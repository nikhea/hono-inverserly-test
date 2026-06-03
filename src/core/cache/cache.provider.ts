import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { RedisProvider } from "../redis/redis.provider";

@injectable()
export class CacheProvider {
  constructor(
    @inject(TYPES.RedisProvider) private readonly redis: RedisProvider,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.redis.getClient().get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.getClient().setex(key, ttlSeconds, serialized);
    } else {
      await this.redis.getClient().set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.getClient().del(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.redis.getClient().keys(pattern);
    if (keys.length > 0) {
      await this.redis.getClient().del(...keys);
    }
  }
}
