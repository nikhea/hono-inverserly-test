import type { Container } from "inversify";
import { TYPES } from "../../core/types";
import { ProductModel } from "./products.schema";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsCache } from "./products.cache";
import { ProductsHandler } from "./products.handler";
import type { IProductContract } from "../../core/contracts/product.contract";

export function bindProductsModule(container: Container): void {
  container.bind(TYPES.ProductModel).toConstantValue(ProductModel);
  container.bind(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
  container.bind(TYPES.ProductsService).to(ProductsService).inSingletonScope();
  container.bind(TYPES.ProductsController).to(ProductsController).inSingletonScope();
  container.bind(ProductsController).toSelf().inSingletonScope();
  container.bind(TYPES.ProductsCache).to(ProductsCache).inSingletonScope();
  container.bind<IProductContract>(TYPES.ProductContract).to(ProductsHandler).inSingletonScope();
}
