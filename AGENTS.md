## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`) and shadcn/ui (Base UI primitives)
- Content: currently pulled from Notion into `src/data/notion-content.json` (`npm run content:pull`) and read with `getBlock()` from `src/lib/notion-content.ts`. This is being replaced by Sanity.

## Project structure

- `src/app/layout.tsx`: root `<html>`/`<body>`, metadata, global CSS
- `src/app/(site)/`: public marketing site (shared Nav layout, home page, about/programs/events/contact)
- `src/components/sections/`: page sections (server components)
- `src/components/ui/`: shadcn components
- Components are server components by default; add `'use client'` only when a component needs state, effects, or event handlers (e.g. `Nav.tsx`).
- Use `next/image` for images and `next/link` for internal links.

## Development

```
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## Documentation

- Next.js: https://nextjs.org/docs
- [App Router routing](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Images](https://nextjs.org/docs/app/getting-started/images)
- Tailwind CSS: https://tailwindcss.com/docs

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
