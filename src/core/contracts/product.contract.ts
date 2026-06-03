export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface IUpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export interface IProductContract {
  getPrice(productId: string, organizationId: string): Promise<number>;
  getProduct(productId: string, organizationId: string): Promise<IProduct | null>;
  checkStock(productId: string, quantity: number, organizationId: string): Promise<boolean>;
}
