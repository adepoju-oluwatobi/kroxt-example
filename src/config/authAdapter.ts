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

  async linkOAuthAccount(userId: string, provider: string, providerId: string) {
    await User.findByIdAndUpdate(userId, {
      oauthProvider: provider,
      oauthId: providerId
    });
  }
};
