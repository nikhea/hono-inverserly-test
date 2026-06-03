import type { PathsObject } from "../../core/openapi/builder";

export const name = "products";

export const paths: PathsObject = {
  "/products": {
    get: {
      tags: ["Products"],
      summary: "List all products",
      responses: { "200": { description: "Array of products" } },
    },
    post: {
      tags: ["Products"],
      summary: "Create a product",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "description", "price", "stock", "category"],
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                stock: { type: "integer" },
                category: { type: "string" },
              },
            },
          },
        },
      },
      responses: { "201": { description: "Product created" } },
    },
  },
  "/products/{id}": {
    get: {
      tags: ["Products"],
      summary: "Get product by ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "Product found" },
        "404": { description: "Product not found" },
      },
    },
    put: {
      tags: ["Products"],
      summary: "Update a product",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                stock: { type: "integer" },
                category: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "Product updated" },
        "404": { description: "Product not found" },
      },
    },
    delete: {
      tags: ["Products"],
      summary: "Delete a product",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "Product deleted" },
        "404": { description: "Product not found" },
      },
    },
  },
};
