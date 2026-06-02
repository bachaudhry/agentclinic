# Phase 1 — Validation

## Checklist

### 1. Install Database Dependencies

- [ ] `better-sqlite3`, `@types/better-sqlite3`, `drizzle-orm`, `drizzle-kit` in package.json
- [ ] `npm install` completes without errors

### 2. Configure Drizzle

- [ ] `drizzle.config.ts` exists and is valid
- [ ] `drizzle-kit push` runs without error

### 3. Define Schema

- [ ] `src/db/schema.ts` compiles with `tsc --noEmit`
- [ ] Four tables defined: agents, ailments, therapies, appointments
- [ ] Drizzle relations defined between tables

### 4. Create Database Connection

- [ ] `src/db/index.ts` exports a working Drizzle instance
- [ ] Importing db does not throw

### 5. Write Seed Script

- [ ] `npm run seed` completes without error
- [ ] Agents table has 5-10 rows
- [ ] Ailments table has 5-10 rows
- [ ] Therapies table has 5-10 rows
- [ ] Appointments table has 5-10 rows

### 6. Run Migration & Seed

- [ ] SQLite file exists after `drizzle-kit push`
- [ ] All four tables exist in the database
- [ ] Sample rows present in each table

### 7. Home Page — Agent Cards

- [ ] `localhost:3000` displays agent cards from database
- [ ] Each card shows name, avatar placeholder, status
- [ ] Cards render in responsive grid layout

### 8. Agent Detail Page

- [ ] `/agents/[id]` displays agent profile (name, description, status)
- [ ] Linked ailments appear on agent detail page
- [ ] Invalid ID shows graceful not-found state
- [ ] Clicking agent card on home page navigates to detail

### 9. Automated Tests

- [ ] `npm run test` passes
- [ ] DB query tests cover: fetch all agents, fetch agent by ID with ailments, fetch ailments by agent
- [ ] Component tests cover: home page renders agent cards, agent detail renders profile and ailments
