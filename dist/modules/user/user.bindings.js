import { TYPES } from "../../core/types";
import { UserModel } from "./user.schema";
import { UserHandler } from "./user.handler";
import { UserController } from "./user.controller";
export function bindUserModule(container) {
    container.bind(TYPES.UserModel).toConstantValue(UserModel);
    container.bind(TYPES.UserContract).to(UserHandler).inSingletonScope();
    container.bind(UserController).toSelf().inSingletonScope();
}
