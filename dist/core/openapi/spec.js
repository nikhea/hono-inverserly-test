const spec = {
    openapi: "3.1.0",
    info: {
        title: "Hono Inverserly API",
        version: "1.0.0",
        description: "Module monolith API with Hono, InversifyJS, MongoDB, and Mastra AI agents",
    },
    servers: [{ url: "http://localhost:5000", description: "Local dev" }],
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "email", "password"],
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string", format: "email" },
                                    password: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: { "201": { description: "User created" }, "409": { description: "Email already registered" } },
            },
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login and receive a token",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Login successful",
                        content: { "application/json": { schema: { type: "object", properties: { user: { type: "object" }, token: { type: "string" } } } } },
                    },
                    "401": { description: "Invalid credentials" },
                },
            },
        },
        "/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Get user by ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { "200": { description: "User found" }, "404": { description: "User not found" } },
            },
        },
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
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { "200": { description: "Product found" }, "404": { description: "Product not found" } },
            },
            put: {
                tags: ["Products"],
                summary: "Update a product",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                requestBody: {
                    content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, price: { type: "number" }, stock: { type: "integer" }, category: { type: "string" } } } } },
                },
                responses: { "200": { description: "Product updated" }, "404": { description: "Product not found" } },
            },
            delete: {
                tags: ["Products"],
                summary: "Delete a product",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { "200": { description: "Product deleted" }, "404": { description: "Product not found" } },
            },
        },
        "/carts/{userId}": {
            get: {
                tags: ["Carts"],
                summary: "Get cart by user ID",
                parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
                responses: { "200": { description: "Cart found" }, "404": { description: "Cart not found" } },
            },
            delete: {
                tags: ["Carts"],
                summary: "Clear cart",
                parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
                responses: { "200": { description: "Cart cleared" } },
            },
        },
        "/carts/{userId}/items": {
            post: {
                tags: ["Carts"],
                summary: "Add item to cart",
                parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
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
                responses: { "201": { description: "Item added" }, "400": { description: "Invalid request" } },
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
    },
};
export default spec;
