# Phase 2 — Ailments & Therapies Pages Plan

## Task Groups

### 1. Ailments List Page

- Create route `src/app/ailments/page.tsx` as a server component
- Fetch all ailments from database
- For each ailment, compute linked agent count (ailments.agentId → agents)
- Sort ailments alphabetically by name (A→Z)
- Render as a responsive grid of cards using PicoCSS semantic HTML
- Each card shows: ailment name, description excerpt, agent count badge
- Verify: `/ailments` renders all ailments alphabetically with correct agent counts

### 2. Ailment Detail Page

- Create dynamic route `src/app/ailments/[id]/page.tsx`
- Fetch ailment by ID
- Fetch linked therapies (many-to-many via junction or via shared `appointments` table — see Decision in requirements)
- Display ailment name, full description, and list of linked therapies
- Each linked therapy is a link to `/therapies/[id]`
- Handle not-found case gracefully
- Verify: clicking an ailment card navigates to detail with correct therapies

### 3. Therapy Detail Page

- Create dynamic route `src/app/therapies/[id]/page.tsx`
- Fetch therapy by ID with description and duration
- Fetch linked ailments (reverse of ailment→therapy relation)
- Display therapy name, description, duration, and list of linked ailments
- Each linked ailment is a link to `/ailments/[id]`
- Handle not-found case gracefully
- Verify: clicking a therapy link from ailment detail navigates with correct data

### 4. Header Navigation

- Add an "Ailments" link to the existing Header component (`src/components/Header.tsx`)
- Keep existing Home link; preserve current layout
- Verify: Header shows Home + Ailments links; Ailments link navigates to `/ailments`

### 5. Cross-Linking Ailment ↔ Therapy

- From ailment detail: render each linked therapy as an anchor tag to `/therapies/[id]`
- From therapy detail: render each linked ailment as an anchor tag to `/ailments/[id]`
- Verify: full click-through works in both directions (ailment → therapy → ailment)

### 6. Automated Tests

- Write Vitest tests for new DB queries: fetch all ailments with agent counts, fetch ailment by ID with therapies, fetch therapy by ID with ailments
- Write Vitest tests for page components: `/ailments` renders cards alphabetically, ailment detail renders therapies, therapy detail renders ailments
- Verify: `npm run test` passes all tests (existing + new)

### 7. End-to-End Verification

- Run `npm run dev` and manually walk the full flow: home → agent → ailment (via agent detail) → therapy → back to ailment
- Manually walk the new flow: home → ailments (header nav) → ailment → therapy → back
- Verify: no console errors, all routes render, all links resolve
