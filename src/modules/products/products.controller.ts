import { Controller, Get, Post, Put, Delete, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import {
  CreatedHttpResponse,
  ErrorHttpResponse,
  HttpStatusCode,
} from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { ProductsService } from "./products.service";
import { createProductSchema, updateProductSchema } from "./products.validation";

@Controller("/products")
export class ProductsController {
  constructor(
    @inject(TYPES.ProductsService) private readonly service: ProductsService,
  ) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Get("/:id")
  async getById(@Params({ name: "id" }) id: string) {
    const product = await this.service.findById(id);
    if (!product) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: "Product not found" },
        "Product not found",
      );
    }
    return product;
  }

  @Post()
  async create(@Body() body: unknown): Promise<CreatedHttpResponse> {
    const parsed = createProductSchema.parse(body);
    const product = await this.service.create(parsed);
    return new CreatedHttpResponse(product);
  }

  @Put("/:id")
  async update(@Params({ name: "id" }) id: string, @Body() body: unknown) {
    const parsed = updateProductSchema.parse(body);
    const product = await this.service.update(id, parsed);
    if (!product) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: "Product not found" },
        "Product not found",
      );
    }
    return product;
  }

  @Delete("/:id")
  async delete(@Params({ name: "id" }) id: string) {
    const deleted = await this.service.delete(id);
    if (!deleted) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: "Product not found" },
        "Product not found",
      );
    }
    return { message: "Product deleted" };
  }
}
