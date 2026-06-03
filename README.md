# Hono Inverserly — Module Monolith API

A TypeScript API built with **Hono**, **InversifyJS**, and **MongoDB**, organized as a **module monolith** with strict contract-based inter-module communication. Integrates **Mastra AI agents** as a separate subsystem.

## Stack

| Layer | Technology |
|-------|-----------|
| HTTP Framework | Hono (via `@inversifyjs/http-hono`) |
| DI Container | InversifyJS |
| Database | MongoDB (Mongoose) |
| Cache | Redis (ioredis) |
| Queue | BullMQ |
| Validation | Zod |
| Auth | Bearer token (base64-encoded JSON payload) |
| AI Agents | Mastra (separate subsystem) |
| Runtime | Node.js (tsx for dev, tsc + tsc-alias for build) |

## Project Structure

```
src/
├── index.ts                          # Entry point
├── mastra.controller.ts              # MastraServer bootstrap
├── core/
│   ├── types.ts                      # All Inversify DI symbols
│   ├── di/container.ts               # Container wiring
│   ├── database/db.provider.ts       # MongoDB (Mongoose)
│   ├── redis/redis.provider.ts       # Redis client (ioredis)
│   ├── redis/redis.keys.ts           # Redis key patterns
│   ├── cache/cache.provider.ts       # Cache abstraction
│   ├── queue/queue.provider.ts       # BullMQ factory
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── audit.middleware.ts
│   │   └── rate-limit.middleware.ts
│   └── contracts/
│       ├── user.contract.ts
│       ├── product.contract.ts
│       └── cart.contract.ts
└── modules/
    ├── auth/                         # Register + login
    ├── user/                         # User profile queries
    ├── products/                     # Product CRUD
    ├── carts/                        # Cart management
    └── audit-logs/jobs/audit.worker.ts
```

## Architecture: Module Monolith

The codebase follows a **module monolith** pattern — everything deploys as one unit, but code is organized by business domain. Modules communicate exclusively through **contract interfaces** and **handlers**, never by directly importing each other's internals.

### Contract Pattern

Each module that exposes functionality to other modules defines:

1. **Contract** (`core/contracts/*.contract.ts`) — Interface of exposed methods
2. **Handler** (`modules/*/*.handler.ts`) — Implementation of the contract
3. **Binding** (`modules/*/*.bindings.ts`) — Registers handler behind the contract's DI symbol

```
Module A (carts)
  └── CartsService
        └── injects IProductContract via DI symbol
              └── ProductsHandler (products module)
                    └── ProductsCache → ProductsRepository → MongoDB
```

### Inter-Module Boundaries

| Module | Exposes Contract? | Contract | Handler |
|--------|-------------------|----------|---------|
| user | Yes | `IUserContract` | `UserHandler` |
| auth | No (uses user contract) | — | — |
| products | Yes | `IProductContract` | `ProductsHandler` |
| carts | Yes | `ICartContract` | `CartsHandler` |

A module must **never** directly import from another module's internals (repositories, services, schemas). Cross-module access goes through contract interfaces injected via DI symbols.

## Core Infrastructure

### `DatabaseProvider`
Mongoose connection to MongoDB. Reads `MONGO_URI` from environment. Connects at startup before the HTTP server starts.

### `RedisProvider`
ioredis client. Reads `REDIS_URL` from environment. Used by `CacheProvider` and `QueueProvider`.

### `CacheProvider`
Generic JSON cache over Redis with `get`, `set` (optional TTL), `del`, and `invalidatePattern` (key glob deletion). Used by product and cart modules for performance.

### `QueueProvider`
BullMQ queue factory. Lazily creates queues and workers. Used by the audit middleware to enqueue request logs and by `AuditWorker` to consume them.

## Middleware

### `AuthMiddleware`
Extracts `Authorization: Bearer <token>`, decodes the base64 JSON payload, and sets `userId` and `userRole` on the Hono context. Returns 401 if missing or invalid.

### `AuditMiddleware`
Measures request duration and enqueues an audit log entry (method, path, userId, status, duration) to BullMQ. The `AuditWorker` processes and logs these.

### `RateLimitMiddleware`
Factory that returns a Hono middleware. Uses Redis `INCR` + `EXPIRE` to limit requests per IP within a configurable window.

## Modules

### Auth (`/auth`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Authenticate and return a token |

The `AuthProvider` uses `IUserContract` (from the user module) to look up and create users — it never touches the database directly.

### Users (`/users`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users/:id` | Get user by ID |

The `UserHandler` implements `IUserContract` with methods: `findById`, `findByEmail`, `createUser`. Other modules inject the contract interface, never the handler directly.

### Products (`/products`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/products` | List all products (cached 60s in Redis) |
| GET | `/products/:id` | Get product by ID (cached) |
| POST | `/products` | Create a product (invalidates cache) |
| PUT | `/products/:id` | Update a product (invalidates cache) |
| DELETE | `/products/:id` | Delete a product (invalidates cache) |

The `ProductsHandler` implements `IProductContract` exposing `getPrice`, `getProduct`, and `checkStock` to other modules. Each method accepts `organizationId` for future multi-tenant support.

### Carts (`/carts`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/carts/:userId` | Get cart for user (cached 120s) |
| POST | `/carts/:userId/items` | Add item to cart (validates stock via `IProductContract`) |
| DELETE | `/carts/:userId/items/:productId` | Remove item from cart |
| DELETE | `/carts/:userId` | Clear cart |

The `CartsService` validates product existence and stock via `IProductContract` — it has zero knowledge of the products module's internals.

### Mastra AI

The `MastraController` initializes Mastra's Hono server adapter, registering AI agent and workflow routes on the same app instance. All Mastra code lives in `src/mastra/` and is completely separate from the application modules.

## DI Container: `TYPES`

All Inversify symbols are defined in `core/types.ts`. Module bindings are registered in `core/di/container.ts` through dedicated `bind*Module()` functions for clean separation of concerns.

## Environment Variables

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hono-inverserly-test
REDIS_URL=redis://localhost:6379
```

## Scripts

```bash
npm run dev    # tsx watch src/index.ts — hot-reload dev server
npm run build  # tsc + tsc-alias — production build to dist/
npm run start  # node dist/index.js — run built server
```
