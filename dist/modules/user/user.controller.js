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
import { Controller, Get, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { ErrorHttpResponse, HttpStatusCode } from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
let UserController = class UserController {
    userContract;
    constructor(userContract) {
        this.userContract = userContract;
    }
    async getById(id) {
        const user = await this.userContract.findById(id);
        if (!user) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: "User not found" }, "User not found");
        }
        return user;
    }
};
__decorate([
    Get("/:id"),
    __param(0, Params({ name: "id" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
UserController = __decorate([
    Controller("/users"),
    __param(0, inject(TYPES.UserContract)),
    __metadata("design:paramtypes", [Object])
], UserController);
export { UserController };
