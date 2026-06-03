export const TYPES = {
  DatabaseProvider: Symbol.for("DatabaseProvider"),
  RedisProvider: Symbol.for("RedisProvider"),
  CacheProvider: Symbol.for("CacheProvider"),
  QueueProvider: Symbol.for("QueueProvider"),

  AuthMiddleware: Symbol.for("AuthMiddleware"),
  AuditMiddleware: Symbol.for("AuditMiddleware"),
  RateLimitMiddleware: Symbol.for("RateLimitMiddleware"),

  UserModel: Symbol.for("UserModel"),
  UserContract: Symbol.for("UserContract"),

  AuthController: Symbol.for("AuthController"),
  AuthProvider: Symbol.for("AuthProvider"),

  ProductModel: Symbol.for("ProductModel"),
  ProductsController: Symbol.for("ProductsController"),
  ProductsService: Symbol.for("ProductsService"),
  ProductsRepository: Symbol.for("ProductsRepository"),
  ProductsCache: Symbol.for("ProductsCache"),
  ProductContract: Symbol.for("ProductContract"),

  CartModel: Symbol.for("CartModel"),
  CartsController: Symbol.for("CartsController"),
  CartsService: Symbol.for("CartsService"),
  CartsRepository: Symbol.for("CartsRepository"),
  CartContract: Symbol.for("CartContract"),
};
