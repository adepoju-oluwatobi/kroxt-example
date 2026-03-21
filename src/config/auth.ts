import { createAuth } from "kroxt";
import { createMongoAdapter } from "kroxt/adapters/mongoose";
import { createDrizzleAdapter } from "kroxt/adapters/drizzle";
import { createPrismaAdapter } from "kroxt/adapters/prisma";
import { User } from "../models/user.model.js";
import { db, prisma, users } from "../db/index.js";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE || "mongodb";

function getAdapter() {
  switch (DB_TYPE) {
    case "drizzle":
      console.log("Using Drizzle (SQLite) Adapter");
      return createDrizzleAdapter(db, users, eq);
    case "prisma":
      console.log("Using Prisma (SQLite) Adapter");
      return createPrismaAdapter(prisma.user);
    case "mongodb":
    default:
      console.log("Using Mongoose (MongoDB) Adapter");
      return createMongoAdapter(User);
  }
}

export const authAdapter = getAdapter();

export const auth = createAuth({
  adapter: authAdapter,
  secret: process.env.JWT_SECRET || "fallback-secret-for-dev",
  pepper: process.env.JWT_PEPPER || "",
  session: {
    expires: "15m",
    refreshExpires: "7d"
  },
  jwt: {
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
