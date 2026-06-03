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
import { TYPES } from "../../core/types";
let AuthProvider = class AuthProvider {
    userContract;
    constructor(userContract) {
        this.userContract = userContract;
    }
    async register(name, email, password) {
        const existing = await this.userContract.findByEmail(email);
        if (existing) {
            throw new Error("Email already registered");
        }
        return this.userContract.createUser({ name, email, password, role: "user" });
    }
    async login(email, password) {
        const user = await this.userContract.findByEmail(email);
        if (!user || user.password !== password) {
            throw new Error("Invalid credentials");
        }
        const token = Buffer.from(JSON.stringify({ userId: user._id, role: user.role })).toString("base64");
        return { user, token };
    }
};
AuthProvider = __decorate([
    injectable(),
    __param(0, inject(TYPES.UserContract)),
    __metadata("design:paramtypes", [Object])
], AuthProvider);
export { AuthProvider };
