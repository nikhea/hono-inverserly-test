import { Controller, Get, Post, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import {
  CreatedHttpResponse,
  ErrorHttpResponse,
  HttpStatusCode,
} from "@inversifyjs/http-core";
import type { IUserService } from "../services/user.service.interface";
import { TYPES } from "../types";

interface CreateUserBody {
  name: string;
  email: string;
}

@Controller("/users")
export class UsersController {
  constructor(
    @inject(TYPES.UserService)
    private readonly userService: IUserService,
  ) {}

  @Get()
  public getAll() {
    return this.userService.findAll();
  }

  @Get("/:id")
  public getById(@Params({ name: "id" }) id: string) {
    const user = this.userService.findById(Number(id));
    if (!user) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: `User ${id} not found` },
        `User ${id} not found`,
      );
    }
    return user;
  }

  @Post()
  public create(@Body() body: CreateUserBody): CreatedHttpResponse {
    const user = this.userService.create(body.name, body.email);
    return new CreatedHttpResponse(user);
  }
}
