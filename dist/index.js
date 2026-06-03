import "reflect-metadata";
import "dotenv/config";
import { InversifyHonoHttpAdapter } from "@inversifyjs/http-hono";
import { serve } from "@hono/node-server";
import { buildContainer } from "./container";
import { MastraController } from "./controllers/mastra.controller";
async function main() {
    const container = buildContainer();
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
