export const name = "user";
export const paths = {
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
