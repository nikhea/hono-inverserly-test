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
import { TYPES } from "../../../core/types";
import { QueueProvider } from "../../../core/queue/queue.provider";
let AuditWorker = class AuditWorker {
    queue;
    constructor(queue) {
        this.queue = queue;
        this.queue.createWorker("audit-logs", this.processAuditLog.bind(this));
    }
    async processAuditLog(job) {
        const { method, path, userId, status, duration, timestamp } = job.data;
        console.log(`[AUDIT] ${timestamp} | ${method} ${path} | user=${userId} | ${status} | ${duration}ms`);
    }
};
AuditWorker = __decorate([
    injectable(),
    __param(0, inject(TYPES.QueueProvider)),
    __metadata("design:paramtypes", [QueueProvider])
], AuditWorker);
export { AuditWorker };
