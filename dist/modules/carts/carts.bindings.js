import { TYPES } from "../../core/types";
import { CartModel } from "./carts.schema";
import { CartsRepository } from "./carts.repository";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { CartsCache } from "./carts.cache";
import { CartsHandler } from "./carts.handler";
export function bindCartsModule(container) {
    container.bind(TYPES.CartModel).toConstantValue(CartModel);
    container.bind(TYPES.CartsRepository).to(CartsRepository).inSingletonScope();
    container.bind(TYPES.CartsService).to(CartsService).inSingletonScope();
    container.bind(TYPES.CartsController).to(CartsController).inSingletonScope();
    container.bind(CartsController).toSelf().inSingletonScope();
    container.bind(CartsCache).toSelf().inSingletonScope();
    container.bind(TYPES.CartContract).to(CartsHandler).inSingletonScope();
}
