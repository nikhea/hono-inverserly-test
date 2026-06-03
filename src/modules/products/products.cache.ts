import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";
import { ProductsRepository } from "./products.repository";
import type { IProduct } from "./products.schema";

@injectable()
export class ProductsCache {
  constructor(
    @inject(TYPES.CacheProvider) private readonly cache: CacheProvider,
    @inject(TYPES.ProductsRepository) private readonly repo: ProductsRepository,
  ) {}

  async getById(id: string): Promise<IProduct | null> {
    const cached = await this.cache.get<IProduct>(REDIS_KEYS.products.byId(id));
    if (cached) return cached;

    const product = await this.repo.findById(id);
    if (product) {
      await this.cache.set(REDIS_KEYS.products.byId(id), product, 60);
    }
    return product;
  }

  async invalidateAll(): Promise<void> {
    await this.cache.invalidatePattern(REDIS_KEYS.products.all());
  }

  async invalidateOne(id: string): Promise<void> {
    await this.cache.del(REDIS_KEYS.products.byId(id));
  }
}
