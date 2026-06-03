import { injectable } from "inversify";
import Redis from "ioredis";

@injectable()
export class RedisProvider {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  }

  getClient(): Redis {
    return this.client;
  }

  async connect(): Promise<void> {
    await this.client.ping();
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}
