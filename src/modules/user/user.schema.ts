import { Schema, model, type Model } from "mongoose";
import type { IUser } from "../../core/contracts/user.contract";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

export const UserModel: Model<IUser> = model<IUser>("User", userSchema);
