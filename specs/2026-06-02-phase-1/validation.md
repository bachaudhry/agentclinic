# Phase 1 — Validation

## Checklist

### 1. Install Database Dependencies

- [x] `better-sqlite3`, `@types/better-sqlite3`, `drizzle-orm`, `drizzle-kit` in package.json
- [x] `npm install` completes without errors

### 2. Configure Drizzle

- [x] `drizzle.config.ts` exists and is valid
- [x] `drizzle-kit push` runs without error

### 3. Define Schema

- [x] `src/db/schema.ts` compiles with `tsc --noEmit`
- [x] Four tables defined: agents, ailments, therapies, appointments
- [x] Drizzle relations defined between tables

### 4. Create Database Connection

- [x] `src/db/index.ts` exports a working Drizzle instance
- [x] Importing db does not throw

### 5. Write Seed Script

- [x] `npm run seed` completes without error
- [x] Agents table has 5-10 rows (8)
- [x] Ailments table has 5-10 rows (10)
- [x] Therapies table has 5-10 rows (7)
- [x] Appointments table has 5-10 rows (10)

### 6. Run Migration & Seed

- [x] SQLite file exists after `drizzle-kit push`
- [x] All four tables exist in the database
- [x] Sample rows present in each table

### 7. Home Page — Agent Cards

- [x] `localhost:3000` displays agent cards from database
- [x] Each card shows name, avatar placeholder, status
- [x] Cards render in responsive grid layout

### 8. Agent Detail Page

- [x] `/agents/[id]` displays agent profile (name, description, status)
- [x] Linked ailments appear on agent detail page
- [x] Invalid ID shows graceful not-found state
- [x] Clicking agent card on home page navigates to detail

### 9. Automated Tests

- [x] `npm run test` passes (31 tests across 7 files)
- [x] DB query tests cover: fetch all agents, fetch agent by ID with ailments, fetch ailments by agent
- [x] Component tests cover: home page renders agent cards, agent detail renders profile and ailments
