import { injectable, inject } from "inversify";
import type { Model } from "mongoose";
import { TYPES } from "../../core/types";
import type { IProduct } from "./products.schema";
import type { ICreateProductInput, IUpdateProductInput } from "../../core/contracts/product.contract";

@injectable()
export class ProductsRepository {
  constructor(
    @inject(TYPES.ProductModel) private readonly model: Model<IProduct>,
  ) {}

  async findAll(): Promise<IProduct[]> {
    return this.model.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.model.findById(id).lean();
  }

  async create(data: ICreateProductInput): Promise<IProduct> {
    const product = await this.model.create(data);
    return product.toObject();
  }

  async update(id: string, data: IUpdateProductInput): Promise<IProduct | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
}
