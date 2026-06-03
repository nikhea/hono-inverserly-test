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
import { CartsRepository } from "./carts.repository";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";
let CartsService = class CartsService {
    repo;
    productContract;
    cache;
    constructor(repo, productContract, cache) {
        this.repo = repo;
        this.productContract = productContract;
        this.cache = cache;
    }
    async getCart(userId) {
        const cached = await this.cache.get(REDIS_KEYS.carts.byUserId(userId));
        if (cached)
            return cached;
        const cart = await this.repo.findByUserId(userId);
        if (cart) {
            await this.cache.set(REDIS_KEYS.carts.byUserId(userId), cart, 120);
        }
        return cart;
    }
    async addItem(userId, productId, quantity) {
        const product = await this.productContract.getProduct(productId, "");
        if (!product) {
            throw new Error("Product not found");
        }
        const hasStock = await this.productContract.checkStock(productId, quantity, "");
        if (!hasStock) {
            throw new Error("Insufficient stock");
        }
        const cart = await this.repo.findByUserId(userId);
        const items = cart?.items || [];
        const existingIndex = items.findIndex((i) => i.productId === productId);
        if (existingIndex >= 0) {
            items[existingIndex].quantity += quantity;
        }
        else {
            items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
            });
        }
        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const updated = await this.repo.upsert(userId, items, total);
        await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
        return updated;
    }
    async removeItem(userId, productId) {
        const cart = await this.repo.findByUserId(userId);
        if (!cart)
            throw new Error("Cart not found");
        const items = cart.items.filter((i) => i.productId !== productId);
        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const updated = await this.repo.upsert(userId, items, total);
        await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
        return updated;
    }
    async clearCart(userId) {
        await this.repo.deleteByUserId(userId);
        await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
    }
};
CartsService = __decorate([
    injectable(),
    __param(0, inject(TYPES.CartsRepository)),
    __param(1, inject(TYPES.ProductContract)),
    __param(2, inject(TYPES.CacheProvider)),
    __metadata("design:paramtypes", [CartsRepository, Object, CacheProvider])
], CartsService);
export { CartsService };
