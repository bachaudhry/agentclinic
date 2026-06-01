# AgentClinic — Tech Stack

## Runtime & Language

- **Node.js** (server-side)
- **TypeScript 5.x** — strict mode enabled throughout

## Framework

- **Next.js (App Router)** — most popular full-stack TS framework, SSR for performance and SEO, API routes for backend logic, excellent DX and dashboard ecosystem

## Database

- **SQLite** (via `better-sqlite3`) — zero-config, file-based, ideal for demos and course projects

## ORM / Query Builder

- **Drizzle ORM** — lightweight, type-safe, excellent SQLite support

## Styling

- **Tailwind CSS** — rapid UI development, attractive defaults, popular with Next.js
- **Responsive design** — mobile-first breakpoints (Tailwind `sm`, `md`, `lg`), flexible layouts, readable on all viewports

## Tooling

- **ESLint** + **Prettier** — linting and formatting
- **TypeScript** strict mode — full type safety

## Testing

- **Vitest** — fast TypeScript-native test runner, Vite-compatible, minimal config

## LLMs & Coding Agents

Tracks LLMs and coding agents used across the project lifecycle to aid transparency and reproducibility.

| Model                    | Agent           | Project Phase                        |
| ------------------------ | -----------     | ------------------------------------ |
| minimax/minimax-2.7      | Kilo (VS Code)  | Phase 0 — planning & tech stack      |
| deepseek/deepseek-v4-pro | Kilo (CLI)      | Replanning                           |
| deepseek/deepseek-v4-pro | Kilo (CLI)      | Phase 0 — responsive design          |

- **Model**: the LLM model identifier (provider-qualified).
- **Agent**: the coding agent or IDE tool used (e.g. Kilo, Copilot, Cursor, Aider).
- **Project Phase**: which phase of the project the model/agent was used during.
