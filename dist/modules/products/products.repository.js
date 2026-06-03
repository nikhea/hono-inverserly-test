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
let ProductsRepository = class ProductsRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.find().sort({ createdAt: -1 }).lean();
    }
    async findById(id) {
        return this.model.findById(id).lean();
    }
    async create(data) {
        const product = await this.model.create(data);
        return product.toObject();
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
    }
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        return result !== null;
    }
};
ProductsRepository = __decorate([
    injectable(),
    __param(0, inject(TYPES.ProductModel)),
    __metadata("design:paramtypes", [Function])
], ProductsRepository);
export { ProductsRepository };
