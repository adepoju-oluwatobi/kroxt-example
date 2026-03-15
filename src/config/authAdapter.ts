import { User } from "../models/user.model.js";
import type { AuthAdapter } from "kroxt/adapter";

export const mongoAdapter: AuthAdapter = {
  async createUser(data: any) {
    const user = await User.create(data);
    const obj = user.toObject();
    return { ...obj, id: obj._id.toString() };
  },

  async findUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) return null;
    const obj = user.toObject();
    return { ...obj, id: obj._id.toString() };
  },

  async findUserById(id: string) {
    const user = await User.findById(id);
    if (!user) return null;
    const obj = user.toObject();
    return { ...obj, id: obj._id.toString() };
  },

  async linkOAuthAccount(user: any, provider: string, providerId: string) {
    // Implement OAuth linking logic if needed
    throw new Error("OAuth not implemented in this example");
  }
};
