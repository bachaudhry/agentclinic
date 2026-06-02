import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const agents = sqliteTable("agents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description"),
  status: text("status"),
  avatarUrl: text("avatar_url"),
});

export const ailments = sqliteTable("ailments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description"),
  agentId: integer("agent_id").references(() => agents.id),
});

export const therapies = sqliteTable("therapies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description"),
  duration: integer("duration"),
});

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentId: integer("agent_id").references(() => agents.id),
  therapyId: integer("therapy_id").references(() => therapies.id),
  dateTime: text("date_time"),
});

export const agentsRelations = relations(agents, ({ many }) => ({
  ailments: many(ailments),
  appointments: many(appointments),
}));

export const ailmentsRelations = relations(ailments, ({ one }) => ({
  agent: one(agents, {
    fields: [ailments.agentId],
    references: [agents.id],
  }),
}));

export const therapiesRelations = relations(therapies, ({ many }) => ({
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  agent: one(agents, {
    fields: [appointments.agentId],
    references: [agents.id],
  }),
  therapy: one(therapies, {
    fields: [appointments.therapyId],
    references: [therapies.id],
  }),
}));
