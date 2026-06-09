# Changelog

## 2026-06-09
- Add Phase 2 feature specs (plan, requirements, validation) under specs/2026-06-09-phase-2/
- Add /ailments page — alphabetical grid of ailment cards with "1 patient: <agent>" badges
- Add /ailments/[id] page — ailment detail with description, linked agent, and linked therapies
- Add /therapies/[id] page — therapy detail with description, duration, and linked ailments
- Add Ailments link to Header navigation
- Add bidirectional cross-linking between ailment and therapy detail pages
- Add AilmentCard, TherapyList, and TherapyAilmentList components
- Add src/db/queries.ts module with testable helpers (fetchAilmentById, fetchTherapiesForAilment, fetchAilmentsForTherapy, etc.)
- Add AilmentNotFound and TherapyNotFound 404 pages
- Add CSS for ailment grid, ailment cards, agent badges, and clickable list items
- Refactor ailment↔therapy join to use appointments table (no direct many-to-many in schema)
- Add 37 new Vitest tests (15 DB query + 17 component + 5 not-found/header); 86 total tests now pass across 14 files
- Update tech-stack.md LLM table with Phase 2 entry (MiniMax-M3 / Kilo CLI)

## 2026-06-02
- Add Phase 1 feature specs (requirements, plan, validation)
- Add database layer with Drizzle ORM + better-sqlite3 (schema, config, connection)
- Add seed script with themed clinic data (8 agents, 7 therapies, 10 ailments, 10 appointments)
- Add home page displaying agent cards from database with avatars and status badges
- Add /agents/[id] detail page with profile and linked ailments
- Replace Tailwind CSS with PicoCSS
- Extract shared utils (getInitials, statusClass, parsePositiveInt) to src/lib/utils.ts
- Extract AgentCard, AgentProfile, AilmentList components to src/components/agents/
- Enable SQLite PRAGMA foreign_keys=ON and journal_mode=WAL
- Make seed script idempotent (DELETE + reset auto-increment + transaction)
- Add route param validation (reject NaN, floats, negative IDs)
- Use Drizzle relational queries in agent detail page
- Add error.tsx boundaries (global + agents/[id])
- Add DATABASE_URL env var support for database path
- Auto-create data/ directory if missing
- Remove dead Tailwind dependencies and PostCSS config
- Update tech-stack.md to reflect PicoCSS
- Replace hardcoded CSS colors with CSS custom properties
- Add 49 Vitest tests including utils edge cases, component tests, and relational DB queries

## 2026-06-01
- Update web UI for responsive design, recursively update project specs
- Add Vitest setup and update existing specs and code
- Add main layout with Header/Main/Footer components
- Re-run Phase 0 formatting and validation checks

## 2026-05-14
- Establish project scaffold and minimal AgentClinic home page
- Add Phase 0 feature specs (requirements, plan, validation)
- Create project constitution
- Initialize project
