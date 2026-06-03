import { TYPES } from "../../core/types";
import { AuthProvider } from "./auth.provider";
import { AuthController } from "./auth.controller";
export function bindAuthModule(container) {
    container.bind(TYPES.AuthProvider).to(AuthProvider).inSingletonScope();
    container.bind(TYPES.AuthController).to(AuthController).inSingletonScope();
    container.bind(AuthController).toSelf().inSingletonScope();
}
