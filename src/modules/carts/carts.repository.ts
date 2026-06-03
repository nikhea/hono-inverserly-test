import { injectable, inject } from "inversify";
import type { Model } from "mongoose";
import { TYPES } from "../../core/types";
import type { ICart, ICartItem } from "./carts.schema";

@injectable()
export class CartsRepository {
  constructor(
    @inject(TYPES.CartModel) private readonly model: Model<ICart>,
  ) {}

  async findByUserId(userId: string): Promise<ICart | null> {
    return this.model.findOne({ userId }).lean();
  }

  async upsert(userId: string, items: ICartItem[], total: number): Promise<ICart> {
    const cart = await this.model.findOneAndUpdate(
      { userId },
      { $set: { items, total } },
      { upsert: true, new: true },
    );
    return cart.toObject();
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.model.findOneAndDelete({ userId });
    return result !== null;
  }
}
