export const name = "auth";
export const paths = {
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
            responses: {
                "201": { description: "User created" },
                "409": { description: "Email already registered" },
            },
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
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: { type: "object" },
                                    token: { type: "string" },
                                },
                            },
                        },
                    },
                },
                "401": { description: "Invalid credentials" },
            },
        },
    },
};
