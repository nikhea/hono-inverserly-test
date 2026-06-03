var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
let AuthMiddleware = class AuthMiddleware {
    async authenticate(c, next) {
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
        }
        catch {
            return c.json({ message: "Invalid token" }, 401);
        }
    }
};
AuthMiddleware = __decorate([
    injectable()
], AuthMiddleware);
export { AuthMiddleware };
