import { swaggerUI } from "@hono/swagger-ui";
export function setupSwaggerUi(app) {
    app.get("/docs", swaggerUI({ url: "/openapi.json" }));
}
