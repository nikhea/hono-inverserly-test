export function buildSpec(...modules) {
    return {
        openapi: "3.1.0",
        info: {
            title: "Hono Inverserly API",
            version: "1.0.0",
            description: "Module monolith API with Hono, InversifyJS, MongoDB, and Mastra AI agents",
        },
        servers: [{ url: "http://localhost:3000", description: "Local dev" }],
        paths: Object.assign({}, ...modules.map((m) => m.paths)),
    };
}
