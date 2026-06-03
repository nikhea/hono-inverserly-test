var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { RedisProvider } from "../redis/redis.provider";
import { REDIS_KEYS } from "../redis/redis.keys";
let RateLimitMiddleware = class RateLimitMiddleware {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async limit(maxRequests, windowSeconds) {
        return async (c, next) => {
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
};
RateLimitMiddleware = __decorate([
    injectable(),
    __param(0, inject(TYPES.RedisProvider)),
    __metadata("design:paramtypes", [RedisProvider])
], RateLimitMiddleware);
export { RateLimitMiddleware };
