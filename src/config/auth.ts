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
  },
  jwt: {
    /**
     * Use the new Kroxt feature to include other user fields in the JWT.
     * We only add extra details to 'access' tokens to keep 'refresh' tokens light.
     */
    payload: (user, type) => {
      if (type === "access") {
        return {
          schoolId: user.schoolId,
          role: user.role,
          age: user.age,
          gender: user.gender
        };
      }
      return {};
    }
  }
});
