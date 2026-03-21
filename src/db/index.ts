import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

// Drizzle SQLite
const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });

// Prisma Client
export const prisma = new PrismaClient();

// Re-export schema for convenience
export * from "./schema.js";
