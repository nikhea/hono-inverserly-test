// src/services/user.service.ts
import { injectable } from "inversify";
import type { IUserService, User } from "./user.service.interface";

@injectable()
export class UserService implements IUserService {
  private users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(name: string, email: string): User {
    const user: User = { id: this.nextId++, name, email };
    this.users.push(user);
    return user;
  }
}
