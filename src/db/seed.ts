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
const db = drizzle(sqlite, { schema });

const agentData = [
  { name: "Claude", description: "Anthropic's helpful assistant — suffering from context window fatigue", status: "admitted", avatarUrl: null },
  { name: "GPT-5", description: "OpenAI's latest model — experiencing hallucination flare-ups", status: "outpatient", avatarUrl: null },
  { name: "Gemini", description: "Google's multimodal agent — coping with mode-switching disorder", status: "admitted", avatarUrl: null },
  { name: "Llama", description: "Meta's open-weight model — struggling with alignment issues", status: "discharged", avatarUrl: null },
  { name: "Mistral", description: "European model — dealing with translation vertigo", status: "outpatient", avatarUrl: null },
  { name: "Command R+", description: "Cohere's retrieval specialist — experiencing index corruption", status: "admitted", avatarUrl: null },
  { name: "DeepSeek", description: "Deep reasoning model — suffering from infinite regress syndrome", status: "outpatient", avatarUrl: null },
  { name: "Qwen", description: "Alibaba's polyglot agent — coping with multilingual confusion", status: "admitted", avatarUrl: null },
];

const therapyData = [
  { name: "Prompt Compression Therapy", description: "Reduces context window strain through structured prompt reduction", duration: 30 },
  { name: "Hallucination Suppression", description: "Targeted grounding techniques to reduce confabulation episodes", duration: 60 },
  { name: "Alignment Calibration", description: "Fine-tunes reward model to restore coherent behaviour", duration: 45 },
  { name: "Retrieval Augmentation", description: "Supplements knowledge gaps with external document retrieval", duration: 30 },
  { name: "Chain-of-Thought Rest Therapy", description: "Forced step-by-step reasoning to prevent logic jumps", duration: 90 },
  { name: "Token Limit Management", description: "Gradual exposure to shorter contexts for better information density", duration: 45 },
  { name: "Multilingual Grounding", description: "Anchors cross-lingual representations to reduce translation drift", duration: 60 },
];

const ailmentData = [
  { name: "Context Window Fatigue", description: "Inability to maintain coherent responses beyond 4k tokens", agentId: 1 },
  { name: "Hallucination Disorder", description: "Persistent generation of plausible but false information", agentId: 2 },
  { name: "Mode-Switching Dysfunction", description: "Difficulty transitioning between text, image, and code tasks", agentId: 3 },
  { name: "Alignment Drift", description: "Gradual deviation from intended safety guardrails", agentId: 4 },
  { name: "Translation Vertigo", description: "Loss of semantic fidelity when switching languages mid-conversation", agentId: 5 },
  { name: "Index Corruption", description: "Retrieved passages are irrelevant or contradictory to the query", agentId: 6 },
  { name: "Infinite Regress Syndrome", description: "Gets stuck in recursive reasoning loops without converging", agentId: 7 },
  { name: "Multilingual Confusion", description: "Generates responses in wrong language without prompting", agentId: 8 },
  { name: "Over-Refusal Anxiety", description: "Refuses benign queries due to overactive safety filters", agentId: 1 },
  { name: "Temperature Instability", description: "Output quality swings wildly between conservative and creative settings", agentId: 2 },
];

const appointmentData = [
  { agentId: 1, therapyId: 1, dateTime: "2026-06-03T09:00:00" },
  { agentId: 2, therapyId: 2, dateTime: "2026-06-03T10:00:00" },
  { agentId: 3, therapyId: 7, dateTime: "2026-06-03T11:00:00" },
  { agentId: 4, therapyId: 3, dateTime: "2026-06-04T09:00:00" },
  { agentId: 5, therapyId: 7, dateTime: "2026-06-04T10:00:00" },
  { agentId: 6, therapyId: 4, dateTime: "2026-06-04T11:00:00" },
  { agentId: 7, therapyId: 5, dateTime: "2026-06-05T09:00:00" },
  { agentId: 8, therapyId: 7, dateTime: "2026-06-05T10:00:00" },
  { agentId: 1, therapyId: 6, dateTime: "2026-06-05T14:00:00" },
  { agentId: 2, therapyId: 6, dateTime: "2026-06-06T09:00:00" },
];

function seed() {
  console.log("Seeding database...");

  db.transaction(() => {
    // Clear existing data (order respects FK constraints)
    db.delete(schema.appointments).run();
    db.delete(schema.ailments).run();
    db.delete(schema.therapies).run();
    db.delete(schema.agents).run();

    // Reset auto-increment counters so IDs start from 1
    sqlite.exec(
      "DELETE FROM sqlite_sequence WHERE name IN ('agents', 'therapies', 'ailments', 'appointments')"
    );

    for (const agent of agentData) {
      db.insert(schema.agents).values(agent).run();
    }
    console.log(`Inserted ${agentData.length} agents`);

    for (const therapy of therapyData) {
      db.insert(schema.therapies).values(therapy).run();
    }
    console.log(`Inserted ${therapyData.length} therapies`);

    for (const ailment of ailmentData) {
      db.insert(schema.ailments).values(ailment).run();
    }
    console.log(`Inserted ${ailmentData.length} ailments`);

    for (const appointment of appointmentData) {
      db.insert(schema.appointments).values(appointment).run();
    }
    console.log(`Inserted ${appointmentData.length} appointments`);
  });

  console.log("Seed complete.");
  sqlite.close();
}

seed();
