import { Controller, Get, Params, Query } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { ErrorHttpResponse, HttpStatusCode } from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import type { IUserContract } from "../../core/contracts/user.contract";

@Controller("/users")
export class UserController {
  constructor(
    @inject(TYPES.UserContract) private readonly userContract: IUserContract,
  ) {}

  @Get("/:id")
  async getById(@Params({ name: "id" }) id: string) {
    const user = await this.userContract.findById(id);
    if (!user) {
      throw new ErrorHttpResponse(
        HttpStatusCode.NOT_FOUND,
        { message: "User not found" },
        "User not found",
      );
    }
    return user;
  }
}
