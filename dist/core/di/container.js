import { Container } from "inversify";
import { TYPES } from "../types";
import { DatabaseProvider } from "../database/db.provider";
import { RedisProvider } from "../redis/redis.provider";
import { CacheProvider } from "../cache/cache.provider";
import { QueueProvider } from "../queue/queue.provider";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { AuditMiddleware } from "../middleware/audit.middleware";
import { RateLimitMiddleware } from "../middleware/rate-limit.middleware";
import { bindAuthModule } from "../../modules/auth/auth.bindings";
import { bindUserModule } from "../../modules/user/user.bindings";
import { bindProductsModule } from "../../modules/products/products.bindings";
import { bindCartsModule } from "../../modules/carts/carts.bindings";
import { MastraController } from "../../mastra.controller";
export function buildContainer() {
    const container = new Container();
    // Core infrastructure
    container.bind(TYPES.DatabaseProvider).to(DatabaseProvider).inSingletonScope();
    container.bind(TYPES.RedisProvider).to(RedisProvider).inSingletonScope();
    container.bind(TYPES.CacheProvider).to(CacheProvider).inSingletonScope();
    container.bind(TYPES.QueueProvider).to(QueueProvider).inSingletonScope();
    // Middleware
    container.bind(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();
    container.bind(TYPES.AuditMiddleware).to(AuditMiddleware).inSingletonScope();
    container.bind(TYPES.RateLimitMiddleware).to(RateLimitMiddleware).inSingletonScope();
    // Feature modules
    bindAuthModule(container);
    bindUserModule(container);
    bindProductsModule(container);
    bindCartsModule(container);
    // Bootstrap controllers
    container.bind(MastraController).toSelf().inSingletonScope();
    return container;
}
