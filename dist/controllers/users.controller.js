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
import { Controller, Get, Post, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { CreatedHttpResponse, ErrorHttpResponse, HttpStatusCode, } from "@inversifyjs/http-core";
import { TYPES } from "../types";
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAll() {
        return this.userService.findAll();
    }
    getById(id) {
        const user = this.userService.findById(Number(id));
        if (!user) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: `User ${id} not found` }, `User ${id} not found`);
        }
        return user;
    }
    create(body) {
        const user = this.userService.create(body.name, body.email);
        return new CreatedHttpResponse(user);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    Get("/:id"),
    __param(0, Params({ name: "id" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getById", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", CreatedHttpResponse)
], UsersController.prototype, "create", null);
UsersController = __decorate([
    Controller("/users"),
    __param(0, inject(TYPES.UserService)),
    __metadata("design:paramtypes", [Object])
], UsersController);
export { UsersController };
