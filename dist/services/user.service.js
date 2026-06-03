var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// src/services/user.service.ts
import { injectable } from "inversify";
let UserService = class UserService {
    users = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
    ];
    nextId = 3;
    findAll() {
        return this.users;
    }
    findById(id) {
        return this.users.find((u) => u.id === id);
    }
    create(name, email) {
        const user = { id: this.nextId++, name, email };
        this.users.push(user);
        return user;
    }
};
UserService = __decorate([
    injectable()
], UserService);
export { UserService };
