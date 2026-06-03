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
import { Controller, Get, Post, Delete, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { CreatedHttpResponse, ErrorHttpResponse, HttpStatusCode, } from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { CartsService } from "./carts.service";
import { addToCartSchema } from "./carts.validation";
let CartsController = class CartsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getCart(userId) {
        const cart = await this.service.getCart(userId);
        if (!cart) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: "Cart not found" }, "Cart not found");
        }
        return cart;
    }
    async addItem(userId, body) {
        const parsed = addToCartSchema.parse(body);
        const cart = await this.service.addItem(userId, parsed.productId, parsed.quantity);
        return new CreatedHttpResponse(cart);
    }
    async removeItem(userId, productId) {
        const cart = await this.service.removeItem(userId, productId);
        return cart;
    }
    async clearCart(userId) {
        await this.service.clearCart(userId);
        return { message: "Cart cleared" };
    }
};
__decorate([
    Get("/:userId"),
    __param(0, Params({ name: "userId" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getCart", null);
__decorate([
    Post("/:userId/items"),
    __param(0, Params({ name: "userId" })),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "addItem", null);
__decorate([
    Delete("/:userId/items/:productId"),
    __param(0, Params({ name: "userId" })),
    __param(1, Params({ name: "productId" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "removeItem", null);
__decorate([
    Delete("/:userId"),
    __param(0, Params({ name: "userId" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "clearCart", null);
CartsController = __decorate([
    Controller("/carts"),
    __param(0, inject(TYPES.CartsService)),
    __metadata("design:paramtypes", [CartsService])
], CartsController);
export { CartsController };
