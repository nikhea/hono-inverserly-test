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
import { Controller, Get, Post, Put, Delete, Body, Params } from "@inversifyjs/http-core";
import { inject } from "inversify";
import { CreatedHttpResponse, ErrorHttpResponse, HttpStatusCode, } from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { ProductsService } from "./products.service";
import { createProductSchema, updateProductSchema } from "./products.validation";
let ProductsController = class ProductsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return this.service.findAll();
    }
    async getById(id) {
        const product = await this.service.findById(id);
        if (!product) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: "Product not found" }, "Product not found");
        }
        return product;
    }
    async create(body) {
        const result = createProductSchema.safeParse(body);
        if (!result.success) {
            throw new ErrorHttpResponse(HttpStatusCode.BAD_REQUEST, { message: "Validation failed", errors: result.error.issues }, "Validation failed");
        }
        const product = await this.service.create(result.data);
        return new CreatedHttpResponse(product);
    }
    async update(id, body) {
        const result = updateProductSchema.safeParse(body);
        if (!result.success) {
            throw new ErrorHttpResponse(HttpStatusCode.BAD_REQUEST, { message: "Validation failed", errors: result.error.issues }, "Validation failed");
        }
        const product = await this.service.update(id, result.data);
        if (!product) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: "Product not found" }, "Product not found");
        }
        return product;
    }
    async delete(id) {
        const deleted = await this.service.delete(id);
        if (!deleted) {
            throw new ErrorHttpResponse(HttpStatusCode.NOT_FOUND, { message: "Product not found" }, "Product not found");
        }
        return { message: "Product deleted" };
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAll", null);
__decorate([
    Get("/:id"),
    __param(0, Params({ name: "id" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getById", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    Put("/:id"),
    __param(0, Params({ name: "id" })),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    Delete("/:id"),
    __param(0, Params({ name: "id" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "delete", null);
ProductsController = __decorate([
    Controller("/products"),
    __param(0, inject(TYPES.ProductsService)),
    __metadata("design:paramtypes", [ProductsService])
], ProductsController);
export { ProductsController };
