import type { PathsObject } from "../../core/openapi/builder";

export const name = "carts";

export const paths: PathsObject = {
  "/carts/{userId}": {
    get: {
      tags: ["Carts"],
      summary: "Get cart by user ID",
      parameters: [
        { name: "userId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "Cart found" },
        "404": { description: "Cart not found" },
      },
    },
    delete: {
      tags: ["Carts"],
      summary: "Clear cart",
      parameters: [
        { name: "userId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: { "200": { description: "Cart cleared" } },
    },
  },
  "/carts/{userId}/items": {
    post: {
      tags: ["Carts"],
      summary: "Add item to cart",
      parameters: [
        { name: "userId", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: { type: "string" },
                quantity: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        "201": { description: "Item added" },
        "400": { description: "Invalid request" },
      },
    },
  },
  "/carts/{userId}/items/{productId}": {
    delete: {
      tags: ["Carts"],
      summary: "Remove item from cart",
      parameters: [
        { name: "userId", in: "path", required: true, schema: { type: "string" } },
        { name: "productId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: { "200": { description: "Item removed" } },
    },
  },
};
