import { swaggerUI } from "@hono/swagger-ui";
import type { Hono } from "hono";

export function setupSwaggerUi(app: Hono): void {
  app.get("/docs", swaggerUI({ url: "/openapi.json" }));
}
