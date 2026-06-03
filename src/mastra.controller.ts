import { injectable } from "inversify";
import { MastraServer } from "@mastra/hono";
import type { Hono } from "hono";
import { mastra } from "./mastra/index";

@injectable()
export class MastraController {
  public async init(app: Hono): Promise<void> {
    const server = new MastraServer({ app, mastra });
    await server.init();
  }
}
