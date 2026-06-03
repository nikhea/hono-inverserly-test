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
import { Controller, Post, Body } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { CreatedHttpResponse, ErrorHttpResponse, HttpStatusCode, } from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { AuthProvider } from "./auth.provider";
let AuthController = class AuthController {
    authProvider;
    constructor(authProvider) {
        this.authProvider = authProvider;
    }
    async register(body) {
        const user = await this.authProvider.register(body.name, body.email, body.password);
        return new CreatedHttpResponse(user);
    }
    async login(body) {
        try {
            const result = await this.authProvider.login(body.email, body.password);
            return result;
        }
        catch {
            throw new ErrorHttpResponse(HttpStatusCode.UNAUTHORIZED, { message: "Invalid credentials" }, "Invalid credentials");
        }
    }
};
__decorate([
    Post("/register"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post("/login"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    Controller("/auth"),
    __param(0, inject(TYPES.AuthProvider)),
    __metadata("design:paramtypes", [AuthProvider])
], AuthController);
export { AuthController };
