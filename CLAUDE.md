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
