# Phase 0 — Validation

## Success Criteria

### 1. Next.js App Router initialized
- [ ] `src/` directory exists with Next.js App Router structure
- [ ] `src/app/page.tsx` (or `.tsx`) renders a basic home page
- [ ] `src/app/layout.tsx` exists with HTML structure

### 2. TypeScript configured
- [ ] `tsconfig.json` exists with strict mode enabled
- [ ] `next-env.d.ts` exists
- [ ] No TypeScript errors on fresh build

### 3. Tailwind CSS configured
- [ ] `tailwind.config.ts` (or `.js`) exists
- [ ] Global CSS includes Tailwind directives
- [ ] Basic Tailwind utility classes work

### 4. ESLint + Prettier configured
- [ ] `.eslintrc.json` (or similar) exists
- [ ] `.prettierrc` (or similar) exists
- [ ] `npm run lint` exits successfully
- [ ] `npm run format` (or `prettier --write`) exits successfully

### 5. Next.js empty shell verification
- [ ] `npm run dev` starts without errors
- [ ] `curl http://localhost:3000` returns 200 OK with default Next.js page
- [ ] Page renders without console errors
- [ ] Dev server can be stopped cleanly

### 6. Minimal AgentClinic Home Page
- [ ] Home page displays clinic-themed heading (e.g., "AgentClinic")
- [ ] Home page displays placeholder welcome content
- [ ] `curl http://localhost:3000` returns 200 OK with AgentClinic page
- [ ] Page renders without console errors