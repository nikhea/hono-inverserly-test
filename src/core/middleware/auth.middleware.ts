import { injectable } from "inversify";
import type { Context, Next } from "hono";

@injectable()
export class AuthMiddleware {
  async authenticate(c: Context, next: Next): Promise<Response | void> {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.slice(7);
    try {
      const payload = JSON.parse(Buffer.from(token, "base64").toString());
      c.set("userId", payload.userId);
      c.set("userRole", payload.role);
      await next();
    } catch {
      return c.json({ message: "Invalid token" }, 401);
    }
  }
}
