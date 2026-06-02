# Phase 1 — Database, Seed & Core Pages Plan

## Task Groups

### 1. Install Database Dependencies

- Install `better-sqlite3` and its types (`@types/better-sqlite3`)
- Install `drizzle-orm` and `drizzle-kit`
- Verify: dependencies appear in `package.json`

### 2. Configure Drizzle

- Create `drizzle.config.ts` at project root pointing to SQLite file
- Set schema path to `src/db/schema.ts`
- Set output path for migrations (even though using `push` mode)
- Verify: `drizzle-kit push` runs without error against an empty database

### 3. Define Schema

- Create `src/db/schema.ts` with four tables:
  - `agents`: id (integer PK), name (text), description (text), status (text), avatarUrl (text)
  - `ailments`: id (integer PK), name (text), description (text), agentId (integer FK → agents)
  - `therapies`: id (integer PK), name (text), description (text), duration (integer)
  - `appointments`: id (integer PK), agentId (integer FK → agents), therapyId (integer FK → therapies), dateTime (text)
- Define Drizzle relations in the same file (agents → ailments, agents → appointments, therapies → appointments)
- All columns nullable where appropriate (minimal constraints)
- Verify: schema file compiles with TypeScript strict mode

### 4. Create Database Connection

- Create `src/db/index.ts` initializing better-sqlite3 and Drizzle instance
- Export db instance for use in server components and API routes
- Verify: importing db instance does not error

### 5. Write Seed Script

- Create `src/db/seed.ts` as a standalone script
- Populate 5-10 agents with themed names and statuses
- Populate 5-10 ailments linked to agents
- Populate 5-10 therapies with descriptions and durations
- Populate 5-10 appointments linking agents to therapies
- Add `seed` script to `package.json`
- Verify: `npm run seed` populates the SQLite file with expected rows

### 6. Run Migration & Seed

- Run `drizzle-kit push` to create database file with tables
- Run seed script to populate data
- Verify: SQLite file contains tables and sample rows

### 7. Home Page — Agent Cards

- Update home page (`src/app/page.tsx`) to fetch all agents from database
- Display agents as cards: name, avatar placeholder (initials), status badge
- Use server component for data fetching
- Style cards with PicoCSS (grid layout via semantic HTML, responsive)
- Verify: agents render from database on home page

### 8. Agent Detail Page

- Create dynamic route `src/app/agents/[id]/page.tsx`
- Fetch agent by ID with linked ailments using Drizzle relations
- Display agent profile (name, description, status) and linked ailments list
- Handle not-found case gracefully
- Verify: clicking an agent card navigates to detail with correct data

### 9. Automated Tests

- Write Vitest tests for DB queries: fetch all agents, fetch agent by ID with ailments, fetch ailments by agent
- Write Vitest tests for page components: home page renders agent cards, agent detail renders profile and ailments
- Verify: `npm run test` passes all tests
