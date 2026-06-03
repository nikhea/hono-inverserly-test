var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
import mongoose from "mongoose";
let DatabaseProvider = class DatabaseProvider {
    isConnected = false;
    async connect() {
        if (this.isConnected)
            return;
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/hono-inverserly-test";
        await mongoose.connect(uri);
        this.isConnected = true;
        console.log("Connected to MongoDB");
    }
    async disconnect() {
        await mongoose.disconnect();
        this.isConnected = false;
    }
};
DatabaseProvider = __decorate([
    injectable()
], DatabaseProvider);
export { DatabaseProvider };
