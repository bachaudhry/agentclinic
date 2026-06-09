# Phase 2 — Requirements & Decisions

## Scope

- `/ailments` page: list all ailments as alphabetical grid cards with linked agent count
- `/ailments/[id]` page: ailment detail with linked therapies
- `/therapies/[id]` page: therapy detail with description, duration, and linked ailments
- Header navigation: add an "Ailments" link alongside Home
- Bidirectional cross-linking between ailment and therapy detail pages
- Vitest tests for new DB queries and page components (mirroring Phase 1)

## Decisions

- **Cross-linking scope:** Add Header nav link to Ailments, plus ailment↔therapy detail links. Do **not** modify agent pages in this phase — keep agent→ailment navigation as-is from Phase 1.
- **Ailments list presentation:** Responsive grid of cards (matching home page agent card style), sorted alphabetically A→Z. Each card shows name, description excerpt, and an agent count badge.
- **Ailment↔therapy relation:** Schema currently has no direct many-to-many table. Compute linked therapies per ailment via the `appointments` join table (ailment → agent → appointments → therapy). For Phase 2 demo purposes, this is acceptable; a junction table can be added in a later phase if needed.
- **Therapy detail layout:** Name, description, duration (in minutes), and a list of linked ailments as anchor links.
- **Ailment detail layout:** Name, full description, and a list of linked therapies as anchor links.
- **Testing:** Match Phase 1 — Vitest unit tests for DB queries + component rendering tests for the three new pages.
- **Styling:** Continue using PicoCSS (no Tailwind, per Phase 1 decision).

## Context

- From `specs/mission.md`: Product wants features for ailments, therapies, and appointment booking; this phase surfaces ailments and therapies as first-class browsable entities ahead of booking in Phase 3.
- From `specs/roadmap.md`: Phase 0 (scaffolding) and Phase 1 (DB + agent pages) are complete. Phase 2 is the next roadmap item: ailments list, ailment detail, therapy detail.
- From `specs/tech-stack.md`: Next.js App Router server components, Drizzle ORM, better-sqlite3, PicoCSS, Vitest. The schema in `src/db/schema.ts` has `agents`, `ailments`, `therapies`, `appointments` with Drizzle relations already defined.
- From Phase 1 files (`specs/2026-06-02-phase-1/`): Established conventions — server components for data fetching, PicoCSS semantic HTML cards, Vitest with `@testing-library/react` for component tests, validation.md checklist format.
- Phase 1 header (`src/components/Header.tsx`) currently only has a Home link — this phase extends it.
