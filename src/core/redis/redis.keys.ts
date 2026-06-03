export const REDIS_KEYS = {
  products: {
    all: () => "products:all",
    byId: (id: string) => `products:${id}`,
    byCategory: (category: string) => `products:category:${category}`,
  },
  carts: {
    byUserId: (userId: string) => `carts:user:${userId}`,
  },
  rateLimit: (key: string) => `ratelimit:${key}`,
  session: (token: string) => `session:${token}`,
};
