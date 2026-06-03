// src/container.ts
import { Container } from "inversify";
import type { IUserService } from "./services/user.service.interface";
import { TYPES } from "./types";
import { UserService } from "./services/user.service";
import { UsersController } from "./controllers/users.controller";
import { MastraController } from "./controllers/mastra.controller";

export function buildContainer(): Container {
  const container = new Container();

  // Bind the service
  container
    .bind<IUserService>(TYPES.UserService)
    .to(UserService)
    .inSingletonScope();

  // Register the controllers so the adapter can discover them
  container.bind(UsersController).toSelf().inSingletonScope();
  container.bind(MastraController).toSelf().inSingletonScope();

  return container;
}
