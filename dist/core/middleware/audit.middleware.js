var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { QueueProvider } from "../queue/queue.provider";
let AuditMiddleware = class AuditMiddleware {
    queue;
    constructor(queue) {
        this.queue = queue;
    }
    async log(c, next) {
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
};
AuditMiddleware = __decorate([
    injectable(),
    __param(0, inject(TYPES.QueueProvider)),
    __metadata("design:paramtypes", [QueueProvider])
], AuditMiddleware);
export { AuditMiddleware };
