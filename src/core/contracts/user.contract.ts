export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface IUserContract {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(data: ICreateUserInput): Promise<IUser>;
}
