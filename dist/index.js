import "reflect-metadata";
import "dotenv/config";
import { InversifyHonoHttpAdapter } from "@inversifyjs/http-hono";
import { serve } from "@hono/node-server";
import { buildContainer } from "./core/di/container";
import { MastraController } from "./mastra.controller";
import { DatabaseProvider } from "./core/database/db.provider";
import { TYPES } from "./core/types";
async function main() {
    const container = buildContainer();
    // Connect to MongoDB
    const dbProvider = container.get(TYPES.DatabaseProvider);
    await dbProvider.connect();
    const adapter = new InversifyHonoHttpAdapter(container);
    const app = await adapter.build();
    const mastraController = container.get(MastraController);
    await mastraController.init(app);
    app.get("/", (c) => {
        return c.json({ status: "success", message: "Hello, Mastra with Hono!" });
    });
    serve({
        fetch: app.fetch,
        port: parseInt(process.env.PORT),
    }, (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    });
}
main().catch(console.error);
