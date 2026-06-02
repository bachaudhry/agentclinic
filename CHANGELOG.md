# Changelog

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
