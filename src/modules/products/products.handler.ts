import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { ProductsCache } from "./products.cache";
import type { IProductContract, IProduct } from "../../core/contracts/product.contract";

@injectable()
export class ProductsHandler implements IProductContract {
  constructor(
    @inject(TYPES.ProductsCache) private readonly productCache: ProductsCache,
  ) {}

  async getPrice(productId: string, _organizationId: string): Promise<number> {
    const product = await this.productCache.getById(productId);
    if (!product) throw new Error("Product not found");
    return product.price;
  }

  async getProduct(productId: string, _organizationId: string): Promise<IProduct | null> {
    return this.productCache.getById(productId) as Promise<IProduct | null>;
  }

  async checkStock(productId: string, quantity: number, _organizationId: string): Promise<boolean> {
    const product = await this.productCache.getById(productId);
    if (!product) return false;
    return product.stock >= quantity;
  }
}
