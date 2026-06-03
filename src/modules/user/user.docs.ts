import type { PathsObject } from "../../core/openapi/builder";

export const name = "user";

export const paths: PathsObject = {
  "/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Get user by ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "User found" },
        "404": { description: "User not found" },
      },
    },
  },
};
