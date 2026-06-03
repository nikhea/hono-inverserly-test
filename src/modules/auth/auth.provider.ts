import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import type { IUserContract, IUser } from "../../core/contracts/user.contract";

@injectable()
export class AuthProvider {
  constructor(
    @inject(TYPES.UserContract) private readonly userContract: IUserContract,
  ) {}

  async register(name: string, email: string, password: string): Promise<IUser> {
    const existing = await this.userContract.findByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    return this.userContract.createUser({ name, email, password, role: "user" });
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.userContract.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const token = Buffer.from(JSON.stringify({ userId: user._id, role: user.role })).toString("base64");
    return { user, token };
  }
}
