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
import { ProductsRepository } from "./products.repository";
let ProductsCache = class ProductsCache {
    cache;
    repo;
    constructor(cache, repo) {
        this.cache = cache;
        this.repo = repo;
    }
    async getById(id) {
        const cached = await this.cache.get(REDIS_KEYS.products.byId(id));
        if (cached)
            return cached;
        const product = await this.repo.findById(id);
        if (product) {
            await this.cache.set(REDIS_KEYS.products.byId(id), product, 60);
        }
        return product;
    }
    async invalidateAll() {
        await this.cache.invalidatePattern(REDIS_KEYS.products.all());
    }
    async invalidateOne(id) {
        await this.cache.del(REDIS_KEYS.products.byId(id));
    }
};
ProductsCache = __decorate([
    injectable(),
    __param(0, inject(TYPES.CacheProvider)),
    __param(1, inject(TYPES.ProductsRepository)),
    __metadata("design:paramtypes", [CacheProvider,
        ProductsRepository])
], ProductsCache);
export { ProductsCache };
