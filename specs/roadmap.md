# AgentClinic — Roadmap

## Phase 0 — Scaffolding

- [x] Initialize Next.js app with App Router, TypeScript, Tailwind CSS
- [x] Configure ESLint + Prettier
- [x] Verify: empty home page renders at `localhost:3000`
- [x] Add minimal AgentClinic home page (clinic heading, placeholder content)
- [x] Add main layout with Header/Main/Footer subcomponents

## Phase 1 — Database Layer

- Install `better-sqlite3` + Drizzle ORM
- Define schema: `agents`, `ailments`, `therapies`, `appointments` tables with relations
- Write Drizzle migration
- Verify: `drizzle-kit push` creates SQLite file with correct tables

## Phase 2 — Seed Data

- Write seed script populating sample agents, ailments, therapies, appointments
- Verify: seed script runs and SQLite file contains expected rows

## Phase 3 — Agent List Page

- Home page fetches and displays all agents as cards (name, avatar placeholder, status)
- Verify: agents render from database on home page

## Phase 4 — Agent Detail Page

- Dynamic route `/agents/[id]` showing agent profile and linked ailments
- Verify: clicking an agent card navigates to detail with correct data

## Phase 5 — Ailments & Therapies Pages

- `/ailments` page: list all ailments with linked agent count
- `/ailments/[id]` page: ailment detail with linked therapies
- `/therapies/[id]` page: therapy detail with description and linked ailments
- Verify: browse ailments, click through to therapy details

## Phase 6 — Appointment Booking

- `/book` page: form to select agent, therapy, date/time
- Validate and persist appointment to database
- Show confirmation after booking
- Verify: booking creates a row; confirmation displays

## Phase 7 — My Appointments

- Agent detail page shows upcoming appointments
- `/appointments` page: list all appointments with agent/therapy/time
- Verify: booked appointments appear in both views

## Phase 8 — Staff Dashboard

- `/dashboard` page: total appointments, bookings by therapy, busiest agents
- Simple stats cards (no charts yet)
- Verify: dashboard reflects seeded + booked data

## Phase 9 — Theming & Copy

- Clinic-themed language throughout (reception, check-in, ward, etc.)
- Consistent color palette and typography
- Agent status badges, therapy icons
- Verify: all pages use themed language and consistent styling

## Phase 10 — Responsive Polish

- Mobile-responsive layout for all pages
- Accessible markup (semantic HTML, ARIA labels)
- Loading and empty states
- Verify: usable on mobile viewport; no console errors
