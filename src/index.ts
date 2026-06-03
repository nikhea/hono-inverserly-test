import "reflect-metadata";
import "dotenv/config";
import { cors } from "hono/cors";
import { Hono } from "hono";
import { InversifyHonoHttpAdapter } from "@inversifyjs/http-hono";
import { serve } from "@hono/node-server";
import { buildContainer } from "./core/di/container";
import { MastraController } from "./mastra.controller";
import { DatabaseProvider } from "./core/database/db.provider";
import { TYPES } from "./core/types";
import { buildSpec } from "./core/openapi/builder";
import { setupSwaggerUi } from "./core/openapi/swagger-ui";
import { paths as authPaths } from "./modules/auth/auth.docs";
import { paths as userPaths } from "./modules/user/user.docs";
import { paths as productPaths } from "./modules/products/products.docs";
import { paths as cartPaths } from "./modules/carts/carts.docs";

const apiSpec = buildSpec(
  { name: "auth", paths: authPaths },
  { name: "user", paths: userPaths },
  { name: "products", paths: productPaths },
  { name: "carts", paths: cartPaths },
);

async function main(): Promise<void> {
  const container = buildContainer();

  const dbProvider = container.get<DatabaseProvider>(TYPES.DatabaseProvider);
  await dbProvider.connect();

  const app = new Hono();
  app.use("*", cors());
  const adapter = new InversifyHonoHttpAdapter(container, undefined, app);
  await adapter.build();

  const mastraController = container.get(MastraController);
  await mastraController.init(app);

  app.get("/openapi.json", (c) => c.json(apiSpec));
  setupSwaggerUi(app);

  app.get("/", (c) => {
    return c.json({ status: "success", message: "Hono Inverserly API" });
  });

  serve(
    {
      fetch: app.fetch,
      port: parseInt(process.env.PORT!),
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
      console.log(`Docs at http://localhost:${info.port}/docs`);
    },
  );
}

main().catch(console.error);
