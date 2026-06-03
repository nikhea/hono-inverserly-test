// src/container.ts
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "./services/user.service";
import { UsersController } from "./controllers/users.controller";
import { MastraController } from "./controllers/mastra.controller";
export function buildContainer() {
    const container = new Container();
    // Bind the service
    container
        .bind(TYPES.UserService)
        .to(UserService)
        .inSingletonScope();
    // Register the controllers so the adapter can discover them
    container.bind(UsersController).toSelf().inSingletonScope();
    container.bind(MastraController).toSelf().inSingletonScope();
    return container;
}
