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
let UserHandler = class UserHandler {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findById(id) {
        const user = await this.userModel.findById(id);
        return user ? user.toObject() : null;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user ? user.toObject() : null;
    }
    async createUser(data) {
        const user = await this.userModel.create(data);
        return user.toObject();
    }
};
UserHandler = __decorate([
    injectable(),
    __param(0, inject(TYPES.UserModel)),
    __metadata("design:paramtypes", [Function])
], UserHandler);
export { UserHandler };
