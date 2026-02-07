# Project: test2

## Stack
- Next.js 16 + TypeScript + App Router
- Tailwind CSS v4
- shadcn/ui (New York style, neutral base)
- Vitest + Testing Library for tests

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm test` — run all tests (vitest)
- `npx shadcn@latest add <component>` — add shadcn component

## Structure
- `src/app/` — Next.js App Router pages
- `src/components/ui/` — shadcn/ui components
- `src/lib/utils.ts` — cn() utility
- `src/__tests__/` — unit tests
- `src/test/setup.ts` — vitest setup with jsdom mocks

## MCP
- Figma MCP (Framelink) configured in `.mcp.json` (gitignored, contains API key)

## Rules
- After each task — commit and push to GitHub
- Never run app locally without explicit user permission
- Repo: https://github.com/ihevodaporu872-hash/test2.git
