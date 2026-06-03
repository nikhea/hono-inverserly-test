import { injectable, inject } from "inversify";
import { Queue, Worker, type Job } from "bullmq";
import { TYPES } from "../types";
import { RedisProvider } from "../redis/redis.provider";

@injectable()
export class QueueProvider {
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  constructor(
    @inject(TYPES.RedisProvider) private readonly redis: RedisProvider,
  ) {}

  getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const queue = new Queue(name, { connection: this.redis.getClient() as any });
      this.queues.set(name, queue);
    }
    return this.queues.get(name)!;
  }

  createWorker(name: string, handler: (job: Job) => Promise<void>): Worker {
    const worker = new Worker(name, handler, { connection: this.redis.getClient() as any });
    this.workers.set(name, worker);
    return worker;
  }

  async addJob(queueName: string, payload: unknown): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.add(queueName, payload);
  }
}
