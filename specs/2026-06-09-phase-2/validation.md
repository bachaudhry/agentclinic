# Phase 2 — Validation

## Checklist

### 1. Ailments List Page

- [x] `/ailments` route returns HTTP 200
- [x] All ailments from the database are rendered (10 cards)
- [x] Ailments appear in alphabetical order (A→Z)
- [x] Each card displays: name, description excerpt, agent count badge ("1 patient: <name>")
- [x] Grid layout is responsive (PicoCSS, `.ailment-grid`)

### 2. Ailment Detail Page

- [x] `/ailments/[id]` route returns HTTP 200 for valid IDs
- [x] Ailment name and full description render
- [x] Linked therapies list renders (computed via `appointments` join)
- [x] Each therapy is a clickable link to `/therapies/[id]`
- [x] Invalid ID (`999`, `abc`) shows graceful not-found state (HTTP 404)

### 3. Therapy Detail Page

- [x] `/therapies/[id]` route returns HTTP 200 for valid IDs
- [x] Therapy name, description, and duration render
- [x] Linked ailments list renders (computed via `appointments` join, sorted alphabetically)
- [x] Each ailment is a clickable link to `/ailments/[id]`
- [x] Invalid ID (`999`, `abc`) shows graceful not-found state (HTTP 404)

### 4. Header Navigation

- [x] Header shows Home + Ailments + About + Contact links
- [x] Ailments link navigates to `/ailments`
- [x] Layout/styling of header unchanged from Phase 1 (`.ac-header-nav` class preserved)

### 5. Cross-Linking Ailment ↔ Therapy

- [x] Clicking an ailment card → ailment detail → clicking a therapy link → therapy detail
  (verified: `/ailments/1` returns 200 with `href="/therapies/1"` and `href="/therapies/6"`; both therapy pages return 200)
- [x] From therapy detail, clicking a linked ailment returns to that ailment's detail
  (verified: `/therapies/1` returns 200 with `href="/ailments/1"` and `href="/ailments/9"`; both ailment pages return 200)
- [x] No broken links in the new flow (all 7 therapies and all 10 ailments return 200)

### 6. Automated Tests

- [x] `npm run test` passes (86 tests across 14 files; Phase 1 + Phase 2 combined)
- [x] DB query tests cover: fetch all ailments with agent counts (`fetchAllAilmentsWithAgent`, `fetchAgentCountForAilment`), fetch ailment by ID with therapies (`fetchAilmentById`, `fetchTherapiesForAilment`), fetch therapy by ID with ailments (`fetchTherapyById`, `fetchAilmentsForTherapy`)
- [x] Component tests cover: `/ailments` alphabetical grid (`AilmentCard` × 7 tests), ailment detail with therapy links (`TherapyList` × 6 tests), therapy detail with ailment links (`TherapyAilmentList` × 4 tests)
- [x] Header test updated: Ailments link present, points to `/ailments`
- [x] `AilmentNotFound` and `TherapyNotFound` components covered by tests

### 7. End-to-End Verification

- [x] `npm run dev` starts without error
- [x] Home → ailments (header nav) → ailment → therapy → back flow works (200 throughout)
- [x] Home → agent → ailment (via agent detail) flow still works — no regression (200 on `/agents/1` and `/agents/8`)
- [x] All 10 ailments and all 7 therapies return 200
- [x] No console errors on any new or existing route (dev log clean)
