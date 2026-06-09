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

- [ ] Clicking an ailment card → ailment detail → clicking a therapy link → therapy detail
- [ ] From therapy detail, clicking a linked ailment returns to that ailment's detail
- [ ] No broken links in the new flow

### 6. Automated Tests

- [ ] `npm run test` passes (Phase 1 tests still green + new Phase 2 tests)
- [ ] DB query tests cover: fetch all ailments with agent counts, fetch ailment by ID with therapies, fetch therapy by ID with ailments
- [ ] Component tests cover: `/ailments` alphabetical grid, ailment detail with therapy links, therapy detail with ailment links

### 7. End-to-End Verification

- [ ] `npm run dev` starts without error
- [ ] Home → agent → ailment (via agent detail) flow still works (no regression)
- [ ] Home → ailments (header nav) → ailment → therapy → back flow works
- [ ] No console errors on any new or existing route
