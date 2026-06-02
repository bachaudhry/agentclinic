import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const dbPath = process.env.DATABASE_URL || "./data/agentclinic.db";

const dir = dbPath.substring(0, dbPath.lastIndexOf("/"));
if (dir && !existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export { sqlite };
export const db = drizzle(sqlite, { schema });
