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
import { TYPES } from "../../core/types";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";
let CartsCache = class CartsCache {
    cache;
    constructor(cache) {
        this.cache = cache;
    }
    async invalidate(userId) {
        await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
    }
};
CartsCache = __decorate([
    injectable(),
    __param(0, inject(TYPES.CacheProvider)),
    __metadata("design:paramtypes", [CacheProvider])
], CartsCache);
export { CartsCache };
