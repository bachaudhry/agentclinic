# Phase 1 — Requirements & Decisions

## Scope

- Install `better-sqlite3` + Drizzle ORM and configure them
- Define schema with four tables: `agents`, `ailments`, `therapies`, `appointments`
- Write Drizzle migration and verify it creates the SQLite file
- Write seed script populating sample agents, ailments, therapies, appointments (5-10 rows each)
- Home page fetches and displays all agents as cards (name, avatar placeholder, status)
- Dynamic route `/agents/[id]` showing agent profile and linked ailments
- Automated Vitest tests for DB queries and page components

## Decisions

- **Schema constraints:** Minimal — columns nullable by default, no strict CHECK constraints, no unique indexes beyond primary keys. Optimized for demo speed.
- **Relations:** Drizzle relations (not manual joins) — defined in schema file alongside tables
- **Seed volume:** 5-10 sample rows per table
- **Migration tool:** `drizzle-kit push` (dev mode, no migration files)
- **Styling:** PicoCSS — lightweight semantic CSS framework, replaces Tailwind for Phase 1 onward
- **Agent card:** Name, avatar placeholder (initials or icon), status badge
- **Agent detail:** Profile section + linked ailments list
- **Testing:** Vitest automated tests for DB queries and page component rendering

## Context

- From `specs/mission.md`: Engineering wants reliable TypeScript stack with dashboard; Product wants agents, ailments, therapies, booking; Marketing wants modern responsive design
- From `specs/tech-stack.md`: Node.js, TypeScript 5.x strict, Next.js App Router, SQLite via better-sqlite3, Drizzle ORM, PicoCSS, Vitest
- From `specs/roadmap.md`: Phase 0 (scaffolding) is complete — Next.js app exists with layout components configured (Tailwind being replaced by PicoCSS in Phase 1)
- Phase 0 established `src/` directory structure, layout components, and Vitest smoke tests
