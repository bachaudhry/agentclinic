import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../schema";
import {
  fetchAllAilmentsWithAgent,
  fetchAilmentById,
  fetchAgentCountForAilment,
  fetchTherapiesForAilment,
  fetchTherapyById,
  fetchAilmentsForTherapy,
} from "../queries";

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

describe("Ailment queries", () => {
  let db: ReturnType<typeof createTestDb>["db"];
  let sqlite: ReturnType<typeof createTestDb>["sqlite"];

  beforeAll(() => {
    const setup = createTestDb();
    db = setup.db;
    sqlite = setup.sqlite;

    db.insert(schema.agents)
      .values([
        { name: "Alice", description: null, status: "admitted", avatarUrl: null },
        { name: "Bob", description: null, status: "outpatient", avatarUrl: null },
      ])
      .run();
    db.insert(schema.therapies)
      .values([
        { name: "TherapyX", description: "X", duration: 30 },
        { name: "TherapyY", description: "Y", duration: 60 },
      ])
      .run();
    db.insert(schema.ailments)
      .values([
        { name: "ZZZ Last", description: "Last alphabetically", agentId: 1 },
        { name: "AAA First", description: "First alphabetically", agentId: 2 },
        { name: "Unassigned", description: "No agent", agentId: null },
      ])
      .run();
    db.insert(schema.appointments)
      .values([
        { agentId: 1, therapyId: 1, dateTime: "2026-06-03T09:00:00" },
        { agentId: 1, therapyId: 2, dateTime: "2026-06-03T10:00:00" },
        { agentId: 2, therapyId: 1, dateTime: "2026-06-04T09:00:00" },
      ])
      .run();
  });

  afterAll(() => {
    sqlite.close();
  });

  it("fetchAllAilmentsWithAgent returns all ailments with agent relation", () => {
    const result = fetchAllAilmentsWithAgent(db);
    expect(result).toHaveLength(3);
    const first = result.find((a) => a.name === "AAA First");
    expect(first?.agent?.name).toBe("Bob");
  });

  it("fetchAllAilmentsWithAgent returns null agent for unassigned ailments", () => {
    const result = fetchAllAilmentsWithAgent(db);
    const unassigned = result.find((a) => a.name === "Unassigned");
    expect(unassigned?.agent).toBeNull();
  });

  it("fetchAilmentById returns the ailment with its agent", () => {
    const result = fetchAilmentById(db, 1);
    expect(result).not.toBeNull();
    expect(result?.name).toBe("ZZZ Last");
    expect(result?.agent?.name).toBe("Alice");
  });

  it("fetchAilmentById returns null for missing id", () => {
    const result = fetchAilmentById(db, 999);
    expect(result).toBeNull();
  });

  it("fetchAgentCountForAilment returns 1 for ailments with an agent", () => {
    expect(fetchAgentCountForAilment(db, 1)).toBe(1);
  });

  it("fetchAgentCountForAilment returns 0 for unassigned ailments", () => {
    expect(fetchAgentCountForAilment(db, 3)).toBe(0);
  });

  it("fetchTherapiesForAilment returns distinct therapies via appointments", () => {
    const result = fetchTherapiesForAilment(db, 1);
    const names = result.map((t) => t.name).sort();
    expect(names).toEqual(["TherapyX", "TherapyY"]);
  });

  it("fetchTherapiesForAilment returns only therapies for that agent", () => {
    const result = fetchTherapiesForAilment(db, 2);
    expect(result.map((t) => t.name)).toEqual(["TherapyX"]);
  });

  it("fetchTherapiesForAilment returns empty for unassigned ailment", () => {
    const result = fetchTherapiesForAilment(db, 3);
    expect(result).toEqual([]);
  });

  it("fetchTherapiesForAilment returns empty for missing ailment", () => {
    const result = fetchTherapiesForAilment(db, 999);
    expect(result).toEqual([]);
  });
});

describe("Therapy queries", () => {
  let db: ReturnType<typeof createTestDb>["db"];
  let sqlite: ReturnType<typeof createTestDb>["sqlite"];

  beforeAll(() => {
    const setup = createTestDb();
    db = setup.db;
    sqlite = setup.sqlite;

    db.insert(schema.agents)
      .values([
        { name: "A1", description: null, status: "admitted", avatarUrl: null },
        { name: "A2", description: null, status: "admitted", avatarUrl: null },
      ])
      .run();
    db.insert(schema.therapies)
      .values({ name: "Target", description: "Target therapy", duration: 45 })
      .run();
    db.insert(schema.ailments)
      .values([
        { name: "AilmentOnA1", description: null, agentId: 1 },
        { name: "AilmentOnA2", description: null, agentId: 2 },
        { name: "Unlinked", description: null, agentId: 1 },
      ])
      .run();
    db.insert(schema.appointments)
      .values([
        { agentId: 1, therapyId: 1, dateTime: "2026-06-03T09:00:00" },
        { agentId: 2, therapyId: 1, dateTime: "2026-06-03T10:00:00" },
      ])
      .run();
  });

  afterAll(() => {
    sqlite.close();
  });

  it("fetchTherapyById returns the therapy", () => {
    const result = fetchTherapyById(db, 1);
    expect(result?.name).toBe("Target");
    expect(result?.duration).toBe(45);
  });

  it("fetchTherapyById returns null for missing id", () => {
    expect(fetchTherapyById(db, 999)).toBeNull();
  });

  it("fetchAilmentsForTherapy returns ailments of agents with appointments for this therapy", () => {
    const result = fetchAilmentsForTherapy(db, 1);
    const names = result.map((a) => a.name).sort();
    expect(names).toEqual(["AilmentOnA1", "AilmentOnA2", "Unlinked"]);
  });

  it("fetchAilmentsForTherapy excludes ailments of agents with no appointments for this therapy", () => {
    db.insert(schema.agents)
      .values({ name: "A3", description: null, status: "admitted", avatarUrl: null })
      .run();
    db.insert(schema.ailments)
      .values({ name: "A3Ailment", description: null, agentId: 3 })
      .run();
    const result = fetchAilmentsForTherapy(db, 1);
    expect(result.find((a) => a.name === "A3Ailment")).toBeUndefined();
  });

  it("fetchAilmentsForTherapy returns empty for therapy with no appointments", () => {
    db.insert(schema.therapies)
      .values({ name: "Lonely", description: null, duration: 30 })
      .run();
    expect(fetchAilmentsForTherapy(db, 2)).toEqual([]);
  });
});
