import { createAuth } from "kroxt";
import { mongoAdapter } from "./authAdapter.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = createAuth({
  adapter: mongoAdapter,
  secret: process.env.JWT_SECRET || "fallback-secret-for-dev",
  pepper: process.env.JWT_PEPPER || "",
  session: {
    expires: "15m",
    refreshExpires: "7d"
  }
});
