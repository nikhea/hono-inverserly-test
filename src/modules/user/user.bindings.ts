import type { Container } from "inversify";
import { TYPES } from "../../core/types";
import { UserModel } from "./user.schema";
import { UserHandler } from "./user.handler";
import { UserController } from "./user.controller";
import type { IUserContract } from "../../core/contracts/user.contract";

export function bindUserModule(container: Container): void {
  container.bind(TYPES.UserModel).toConstantValue(UserModel);
  container.bind<IUserContract>(TYPES.UserContract).to(UserHandler).inSingletonScope();
  container.bind(UserController).toSelf().inSingletonScope();
}
