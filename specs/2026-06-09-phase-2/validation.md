# Phase 2 — Validation

## Checklist

### 1. Ailments List Page

- [ ] `/ailments` route returns HTTP 200
- [ ] All ailments from the database are rendered
- [ ] Ailments appear in alphabetical order (A→Z)
- [ ] Each card displays: name, description excerpt, agent count badge
- [ ] Grid layout is responsive (PicoCSS)

### 2. Ailment Detail Page

- [ ] `/ailments/[id]` route returns HTTP 200 for valid IDs
- [ ] Ailment name and full description render
- [ ] Linked therapies list renders
- [ ] Each therapy is a clickable link to `/therapies/[id]`
- [ ] Invalid ID shows graceful not-found state

### 3. Therapy Detail Page

- [ ] `/therapies/[id]` route returns HTTP 200 for valid IDs
- [ ] Therapy name, description, and duration render
- [ ] Linked ailments list renders
- [ ] Each ailment is a clickable link to `/ailments/[id]`
- [ ] Invalid ID shows graceful not-found state

### 4. Header Navigation

- [ ] Header shows Home + Ailments links
- [ ] Ailments link navigates to `/ailments`
- [ ] Layout/styling of header unchanged from Phase 1

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
