# Phase 0 — Requirements & Decisions

## Scope

- Phase 0 establishes the foundational scaffold for AgentClinic
- No business logic, no database, no UI components beyond a minimal home page
- Pure setup: Next.js + TypeScript + Tailwind + ESLint + Prettier
- Includes minimal AgentClinic-branded home page (clinic heading, placeholder content)

## Decisions

- **Next.js location:** `src/` subdirectory (not root)
- **Src directory:** App Router structure placed inside `src/`
- **Tailwind:** Default Next.js + Tailwind configuration
- **ESLint/Prettier:** Default Next.js configuration, no extras
- **Vitest:** Fast TypeScript-native test runner, smoke tests for scaffolding validation
- **Layout components:** Header, Main, and Footer each in separate files under `src/components/layout/`
- **Layout composition:** `Layout.tsx` composes Header, Main, Footer subcomponents
- **Layout styling:** `layout.css` in `src/components/layout/` with flexbox structure

## Context

- From `specs/mission.md`: Engineering stack is "popular TypeScript" with Next.js App Router
- From `specs/tech-stack.md`: Node.js, TypeScript 5.x strict, Next.js App Router, Tailwind CSS, Vitest
- Current `agentclinic/` contains project metadata (prompts.md, README.md, .gitignore)
- `src/` directory exists (currently minimal) — Next.js app will be placed here
