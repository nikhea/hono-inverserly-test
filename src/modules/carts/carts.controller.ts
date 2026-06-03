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
    const parsed = addToCartSchema.parse(body);
    const cart = await this.service.addItem(userId, parsed.productId, parsed.quantity);
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
