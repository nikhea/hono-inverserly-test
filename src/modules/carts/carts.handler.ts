import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { CartsRepository } from "./carts.repository";
import type { ICartContract, ICart } from "../../core/contracts/cart.contract";

@injectable()
export class CartsHandler implements ICartContract {
  constructor(
    @inject(TYPES.CartsRepository) private readonly repo: CartsRepository,
  ) {}

  async getCart(userId: string): Promise<ICart | null> {
    return this.repo.findByUserId(userId);
  }

  async getItemCount(userId: string): Promise<number> {
    const cart = await this.repo.findByUserId(userId);
    if (!cart) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
