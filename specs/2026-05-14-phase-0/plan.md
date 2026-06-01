# Phase 0 — Scaffolding Plan

## Task Groups

### 1. Initialize Next.js App

- Create `src/` subdirectory with Next.js App Router
- Use `create-next-app` with TypeScript, Tailwind CSS, App Router, with src directory
- Accept all defaults for ESLint, Prettier, Tailwind

### 2. Configure Tooling

- Verify ESLint is configured and runs
- Verify Prettier is configured and runs
- Ensure TypeScript strict mode enabled

### 3. Verify Next.js Empty Shell

- Start dev server and confirm `localhost:3000` renders default Next.js page
- Confirm no console errors on empty page

### 4. Minimal AgentClinic Home Page

- Replace default Next.js page with minimal AgentClinic-branded home page
- Include clinic-themed heading/title
- Include basic placeholder content (e.g., "Welcome to AgentClinic")
- Verify page renders at `localhost:3000`

### 5. Main Layout with Header/Main/Footer

- Create `src/components/layout/` directory
- Create `Header.tsx` subcomponent with clinic branding
- Create `Main.tsx` subcomponent for main content area
- Create `Footer.tsx` subcomponent with copyright/info
- Create `Layout.tsx` main component composing three subcomponents
- Create `layout.css` with layout-specific styles (header, main, footer)
- Import CSS in Layout.tsx and link via `<link>` tag in metadata
