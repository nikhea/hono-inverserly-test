export const REDIS_KEYS = {
    products: {
        all: () => "products:all",
        byId: (id) => `products:${id}`,
        byCategory: (category) => `products:category:${category}`,
    },
    carts: {
        byUserId: (userId) => `carts:user:${userId}`,
    },
    rateLimit: (key) => `ratelimit:${key}`,
    session: (token) => `session:${token}`,
};
