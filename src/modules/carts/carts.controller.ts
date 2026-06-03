import { Controller, Get, Post, Delete, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import {
  CreatedHttpResponse,
  ErrorHttpResponse,
  HttpStatusCode,
} from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { CartsService } from "./carts.service";
import { addToCartSchema } from "./carts.validation";

@Controller("/carts")
export class CartsController {
  constructor(
    @inject(TYPES.CartsService) private readonly service: CartsService,
  ) {}

  @Get("/:userId")
  async getCart(@Params({ name: "userId" }) userId: string) {
    const cart = await this.service.getCart(userId);
    if (!cart) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: "Cart not found" },
        "Cart not found",
      );
    }
    return cart;
  }

  @Post("/:userId/items")
  async addItem(
    @Params({ name: "userId" }) userId: string,
    @Body() body: unknown,
  ): Promise<CreatedHttpResponse> {
    const result = addToCartSchema.safeParse(body);
    if (!result.success) {
      throw new ErrorHttpResponse(
        HttpStatusCode.BAD_REQUEST,
        { message: "Validation failed", errors: result.error.issues },
        "Validation failed",
      );
    }
    const cart = await this.service.addItem(userId, result.data.productId, result.data.quantity);
    return new CreatedHttpResponse(cart);
  }

  @Delete("/:userId/items/:productId")
  async removeItem(
    @Params({ name: "userId" }) userId: string,
    @Params({ name: "productId" }) productId: string,
  ) {
    const cart = await this.service.removeItem(userId, productId);
    return cart;
  }

  @Delete("/:userId")
  async clearCart(@Params({ name: "userId" }) userId: string) {
    await this.service.clearCart(userId);
    return { message: "Cart cleared" };
  }
}
