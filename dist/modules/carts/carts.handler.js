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
import { CartsRepository } from "./carts.repository";
let CartsHandler = class CartsHandler {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getCart(userId) {
        return this.repo.findByUserId(userId);
    }
    async getItemCount(userId) {
        const cart = await this.repo.findByUserId(userId);
        if (!cart)
            return 0;
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }
};
CartsHandler = __decorate([
    injectable(),
    __param(0, inject(TYPES.CartsRepository)),
    __metadata("design:paramtypes", [CartsRepository])
], CartsHandler);
export { CartsHandler };
