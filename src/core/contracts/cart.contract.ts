export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddToCartInput {
  productId: string;
  quantity: number;
}

export interface ICartContract {
  getCart(userId: string): Promise<ICart | null>;
  getItemCount(userId: string): Promise<number>;
}
