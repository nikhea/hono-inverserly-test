import { injectable, inject } from "inversify";
import type { Context, Next } from "hono";
import { TYPES } from "../types";
import { RedisProvider } from "../redis/redis.provider";
import { REDIS_KEYS } from "../redis/redis.keys";

@injectable()
export class RateLimitMiddleware {
  constructor(
    @inject(TYPES.RedisProvider) private readonly redis: RedisProvider,
  ) {}

  async limit(maxRequests: number, windowSeconds: number) {
    return async (c: Context, next: Next): Promise<Response | void> => {
      const key = REDIS_KEYS.rateLimit(c.req.header("x-forwarded-for") || "unknown");
      const client = this.redis.getClient();
      const current = await client.incr(key);

      if (current === 1) {
        await client.expire(key, windowSeconds);
      }

      if (current > maxRequests) {
        return c.json({ message: "Too many requests" }, 429);
      }

      await next();
    };
  }
}
