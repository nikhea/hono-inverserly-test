export interface User {
  id: number;
  name: string;
  email: string;
}

export interface IUserService {
  findAll(): User[];
  findById(id: number): User | undefined;
  create(name: string, email: string): User;
}
