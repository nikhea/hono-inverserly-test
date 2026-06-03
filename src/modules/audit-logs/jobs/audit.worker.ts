import { injectable, inject } from "inversify";
import type { Job } from "bullmq";
import { TYPES } from "../../../core/types";
import { QueueProvider } from "../../../core/queue/queue.provider";

@injectable()
export class AuditWorker {
  constructor(
    @inject(TYPES.QueueProvider) private readonly queue: QueueProvider,
  ) {
    this.queue.createWorker("audit-logs", this.processAuditLog.bind(this));
  }

  private async processAuditLog(job: Job): Promise<void> {
    const { method, path, userId, status, duration, timestamp } = job.data;
    console.log(
      `[AUDIT] ${timestamp} | ${method} ${path} | user=${userId} | ${status} | ${duration}ms`,
    );
  }
}
