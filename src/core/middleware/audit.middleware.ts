import { injectable, inject } from "inversify";
import type { Context, Next } from "hono";
import { TYPES } from "../types";
import { QueueProvider } from "../queue/queue.provider";

@injectable()
export class AuditMiddleware {
  constructor(
    @inject(TYPES.QueueProvider) private readonly queue: QueueProvider,
  ) {}

  async log(c: Context, next: Next): Promise<void> {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;

    this.queue.addJob("audit-logs", {
      method: c.req.method,
      path: c.req.path,
      userId: c.get("userId") || "anonymous",
      status: c.res.status,
      duration,
      timestamp: new Date().toISOString(),
    });
  }
}
