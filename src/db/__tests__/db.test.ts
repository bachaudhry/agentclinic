import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../schema";
import { agents, ailments, therapies, appointments } from "../schema";
import { eq } from "drizzle-orm";

function createTestDb() {
  const sqlite = new Database(":memory:");
  sqlite.pragma("foreign_keys = ON");
  const db = drizzle(sqlite, { schema });

  sqlite.exec(`
    CREATE TABLE agents (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, status TEXT, avatar_url TEXT);
    CREATE TABLE therapies (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, duration INTEGER);
    CREATE TABLE ailments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, agent_id INTEGER REFERENCES agents(id));
    CREATE TABLE appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER REFERENCES agents(id), therapy_id INTEGER REFERENCES therapies(id), date_time TEXT);
  `);

  return { db, sqlite };
}

describe("DB queries", () => {
  let db: ReturnType<typeof createTestDb>["db"];
  let sqlite: ReturnType<typeof createTestDb>["sqlite"];

  beforeAll(() => {
    const setup = createTestDb();
    db = setup.db;
    sqlite = setup.sqlite;

    db.insert(agents).values({ name: "TestAgent", description: "A test agent", status: "admitted", avatarUrl: null }).run();
    db.insert(therapies).values({ name: "TestTherapy", description: "A test therapy", duration: 30 }).run();
    db.insert(ailments).values({ name: "TestAilment", description: "A test ailment", agentId: 1 }).run();
    db.insert(appointments).values({ agentId: 1, therapyId: 1, dateTime: "2026-06-03T09:00:00" }).run();
  });

  afterAll(() => {
    sqlite.close();
  });

  it("fetches all agents", () => {
    const result = db.select().from(agents).all();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("TestAgent");
  });

  it("fetches agent by ID", () => {
    const result = db.select().from(agents).where(eq(agents.id, 1)).get();
    expect(result).toBeDefined();
    expect(result!.name).toBe("TestAgent");
  });

  it("fetches ailments by agent ID", () => {
    const result = db.select().from(ailments).where(eq(ailments.agentId, 1)).all();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("TestAilment");
  });

  it("fetches agent with ailments using relational query", () => {
    const result = db.query.agents.findFirst({
      where: eq(agents.id, 1),
      with: { ailments: true },
    }).sync();
    expect(result).toBeDefined();
    expect(result!.name).toBe("TestAgent");
    expect(result!.ailments).toHaveLength(1);
    expect(result!.ailments[0].name).toBe("TestAilment");
  });

  it("fetches therapies", () => {
    const result = db.select().from(therapies).all();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("TestTherapy");
  });

  it("fetches appointments by agent ID", () => {
    const result = db.select().from(appointments).where(eq(appointments.agentId, 1)).all();
    expect(result).toHaveLength(1);
    expect(result[0].therapyId).toBe(1);
  });
});
