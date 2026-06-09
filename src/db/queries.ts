import { and, eq, sql } from "drizzle-orm";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { agents, ailments, appointments, therapies } from "./schema";
import * as schema from "./schema";

type Db = BetterSQLite3Database<typeof schema>;

export interface AilmentWithAgent {
  id: number;
  name: string | null;
  description: string | null;
  agent: { id: number; name: string | null } | null;
}

export interface TherapySummary {
  id: number;
  name: string | null;
  description: string | null;
  duration: number | null;
}

export interface AilmentSummary {
  id: number;
  name: string | null;
  description: string | null;
}

/**
 * Fetch all ailments, each joined to its (single) agent, returning a list
 * suitable for alphabetical rendering in the ailments grid.
 */
export function fetchAllAilmentsWithAgent(db: Db): AilmentWithAgent[] {
  return db.query.ailments.findMany({
    with: { agent: { columns: { id: true, name: true } } },
  }).sync();
}

/**
 * Fetch a single ailment by ID with its agent relation loaded.
 * Returns null if not found.
 */
export function fetchAilmentById(
  db: Db,
  id: number
): (AilmentWithAgent & { agentId: number | null }) | null {
  return (
    db.query.ailments.findFirst({
      where: eq(ailments.id, id),
      with: { agent: { columns: { id: true, name: true } } },
    }).sync() ?? null
  );
}

/**
 * Distinct therapies linked to an ailment. The schema has no direct
 * ailment↔therapy relation, so we resolve it via the appointments table:
 *   ailment → (agentId) → appointments → therapyId → therapy
 */
export function fetchTherapiesForAilment(
  db: Db,
  ailmentId: number
): TherapySummary[] {
  const ailment = db.query.ailments.findFirst({
    where: eq(ailments.id, ailmentId),
    columns: { agentId: true },
  }).sync();

  if (!ailment || ailment.agentId === null) {
    return [];
  }

  return db
    .selectDistinct({ therapy: therapies })
    .from(appointments)
    .innerJoin(therapies, eq(appointments.therapyId, therapies.id))
    .where(eq(appointments.agentId, ailment.agentId))
    .all()
    .map((row) => row.therapy);
}

/**
 * Fetch a single therapy by ID. Returns null if not found.
 */
export function fetchTherapyById(
  db: Db,
  id: number
): (typeof therapies.$inferSelect) | null {
  return db.query.therapies.findFirst({
    where: eq(therapies.id, id),
  }).sync() ?? null;
}

/**
 * Distinct ailments currently treated with the given therapy. Resolved via:
 *   therapy → (appointments.therapyId) → appointments → agentId → ailments
 */
export function fetchAilmentsForTherapy(
  db: Db,
  therapyId: number
): AilmentSummary[] {
  const rows = db
    .selectDistinct({ ailment: ailments })
    .from(appointments)
    .innerJoin(ailments, eq(appointments.agentId, ailments.agentId))
    .where(eq(appointments.therapyId, therapyId))
    .all();

  return rows.map((row) => row.ailment);
}

/**
 * Count of agents currently diagnosed with this ailment.
 * With the current schema (one agent per ailment) this is always 0 or 1.
 */
export function fetchAgentCountForAilment(db: Db, ailmentId: number): number {
  const result = db
    .select({ count: sql<number>`count(*)` })
    .from(ailments)
    .where(and(eq(ailments.id, ailmentId), sql`${ailments.agentId} IS NOT NULL`))
    .get();
  return result?.count ?? 0;
}

// Re-export schema for convenience
export { agents, ailments, appointments, therapies };
