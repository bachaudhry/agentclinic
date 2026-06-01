# Phase 0 — Validation

## Success Criteria

### 1. Next.js App Router initialized

- [x] `src/` directory exists with Next.js App Router structure
- [x] `src/app/page.tsx` (or `.tsx`) renders a basic home page
- [x] `src/app/layout.tsx` exists with HTML structure

### 2. TypeScript configured

- [x] `tsconfig.json` exists with strict mode enabled
- [x] `next-env.d.ts` exists
- [x] No TypeScript errors on fresh build

### 3. Tailwind CSS configured

- [x] `tailwind.config.ts` (or `.js`) exists
- [x] Global CSS includes Tailwind directives
- [x] Basic Tailwind utility classes work

### 4. ESLint + Prettier configured

- [x] `.eslintrc.json` (or similar) exists (eslint.config.mjs)
- [x] `.prettierrc` (or similar) exists
- [x] `npm run lint` exits successfully
- [x] `npm run format` (or `prettier --write`) exits successfully

### 5. Next.js empty shell verification

- [x] `npm run dev` starts without errors
- [x] `curl http://localhost:3000` returns 200 OK with default Next.js page
- [x] Page renders without console errors
- [x] Dev server can be stopped cleanly

### 6. Minimal AgentClinic Home Page

- [x] Home page displays clinic-themed heading (e.g., "AgentClinic")
- [x] Home page displays placeholder welcome content
- [x] `curl http://localhost:3000` returns 200 OK with AgentClinic page
- [x] Page renders without console errors
