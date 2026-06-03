import { injectable } from "inversify";
import mongoose from "mongoose";

@injectable()
export class DatabaseProvider {
  private isConnected = false;

  async connect(): Promise<void> {
    if (this.isConnected) return;
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/hono-inverserly-test";
    await mongoose.connect(uri);
    this.isConnected = true;
    console.log("Connected to MongoDB");
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}
