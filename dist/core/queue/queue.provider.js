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
import { Queue, Worker } from "bullmq";
import { TYPES } from "../types";
import { RedisProvider } from "../redis/redis.provider";
let QueueProvider = class QueueProvider {
    redis;
    queues = new Map();
    workers = new Map();
    constructor(redis) {
        this.redis = redis;
    }
    getQueue(name) {
        if (!this.queues.has(name)) {
            const queue = new Queue(name, { connection: this.redis.getClient() });
            this.queues.set(name, queue);
        }
        return this.queues.get(name);
    }
    createWorker(name, handler) {
        const worker = new Worker(name, handler, { connection: this.redis.getClient() });
        this.workers.set(name, worker);
        return worker;
    }
    async addJob(queueName, payload) {
        const queue = this.getQueue(queueName);
        await queue.add(queueName, payload);
    }
};
QueueProvider = __decorate([
    injectable(),
    __param(0, inject(TYPES.RedisProvider)),
    __metadata("design:paramtypes", [RedisProvider])
], QueueProvider);
export { QueueProvider };
