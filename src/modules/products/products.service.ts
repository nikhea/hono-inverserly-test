import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { ProductsRepository } from "./products.repository";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";
import type { IProduct } from "./products.schema";
import type { ICreateProductInput, IUpdateProductInput } from "../../core/contracts/product.contract";

@injectable()
export class ProductsService {
  constructor(
    @inject(TYPES.ProductsRepository) private readonly repo: ProductsRepository,
    @inject(TYPES.CacheProvider) private readonly cache: CacheProvider,
  ) {}

  async findAll(): Promise<IProduct[]> {
    const cached = await this.cache.get<IProduct[]>(REDIS_KEYS.products.all());
    if (cached) return cached;

    const products = await this.repo.findAll();
    await this.cache.set(REDIS_KEYS.products.all(), products, 60);
    return products;
  }

  async findById(id: string): Promise<IProduct | null> {
    const cached = await this.cache.get<IProduct>(REDIS_KEYS.products.byId(id));
    if (cached) return cached;

    const product = await this.repo.findById(id);
    if (product) {
      await this.cache.set(REDIS_KEYS.products.byId(id), product, 60);
    }
    return product;
  }

  async create(data: ICreateProductInput): Promise<IProduct> {
    const product = await this.repo.create(data);
    await this.cache.del(REDIS_KEYS.products.all());
    return product;
  }

  async update(id: string, data: IUpdateProductInput): Promise<IProduct | null> {
    const product = await this.repo.update(id, data);
    await this.cache.del(REDIS_KEYS.products.all());
    await this.cache.del(REDIS_KEYS.products.byId(id));
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted) {
      await this.cache.del(REDIS_KEYS.products.all());
      await this.cache.del(REDIS_KEYS.products.byId(id));
    }
    return deleted;
  }
}
