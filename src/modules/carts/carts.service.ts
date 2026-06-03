import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { CartsRepository } from "./carts.repository";
import { CacheProvider } from "../../core/cache/cache.provider";
import { REDIS_KEYS } from "../../core/redis/redis.keys";
import type { ICart } from "./carts.schema";
import type { IProductContract } from "../../core/contracts/product.contract";

@injectable()
export class CartsService {
  constructor(
    @inject(TYPES.CartsRepository) private readonly repo: CartsRepository,
    @inject(TYPES.ProductContract) private readonly productContract: IProductContract,
    @inject(TYPES.CacheProvider) private readonly cache: CacheProvider,
  ) {}

  async getCart(userId: string): Promise<ICart | null> {
    const cached = await this.cache.get<ICart>(REDIS_KEYS.carts.byUserId(userId));
    if (cached) return cached;

    const cart = await this.repo.findByUserId(userId);
    if (cart) {
      await this.cache.set(REDIS_KEYS.carts.byUserId(userId), cart, 120);
    }
    return cart;
  }

  async addItem(userId: string, productId: string, quantity: number): Promise<ICart> {
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
    } else {
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

  async removeItem(userId: string, productId: string): Promise<ICart> {
    const cart = await this.repo.findByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    const items = cart.items.filter((i) => i.productId !== productId);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const updated = await this.repo.upsert(userId, items, total);

    await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
    return updated;
  }

  async clearCart(userId: string): Promise<void> {
    await this.repo.deleteByUserId(userId);
    await this.cache.del(REDIS_KEYS.carts.byUserId(userId));
  }
}
