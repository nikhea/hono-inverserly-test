import { injectable, inject } from "inversify";
import type { Model } from "mongoose";
import { TYPES } from "../../core/types";
import type { IUser, IUserContract, ICreateUserInput } from "../../core/contracts/user.contract";

@injectable()
export class UserHandler implements IUserContract {
  constructor(
    @inject(TYPES.UserModel) private readonly userModel: Model<IUser>,
  ) {}

  async findById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findById(id);
    return user ? user.toObject() : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  async createUser(data: ICreateUserInput): Promise<IUser> {
    const user = await this.userModel.create(data);
    return user.toObject();
  }
}
