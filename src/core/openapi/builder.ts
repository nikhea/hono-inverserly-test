import type { OpenAPIV3 } from "openapi-types";

export type PathsObject = OpenAPIV3.PathsObject;

export function buildSpec(
  ...modules: { name: string; paths: PathsObject }[]
): OpenAPIV3.Document {
  return {
    openapi: "3.1.0",
    info: {
      title: "Hono Inverserly API",
      version: "1.0.0",
      description:
        "Module monolith API with Hono, InversifyJS, MongoDB, and Mastra AI agents",
    },
    servers: [{ url: "http://localhost:3000", description: "Local dev" }],
    paths: Object.assign({}, ...modules.map((m) => m.paths)),
  } as OpenAPIV3.Document;
}
