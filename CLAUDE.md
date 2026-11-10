## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`) and shadcn/ui (Base UI primitives)
- Sanity for content, with the Studio embedded at `/studio`

## Project structure

- `src/app/(site)/`: public site. Its `layout.tsx` is a root layout (html/body, Nav, global CSS)
- `src/app/studio/`: Sanity Studio, with its own root layout so it doesn't inherit site styles
- `src/app/api/revalidate/route.ts`: Sanity webhook target; revalidates the published document's `_type` tag
- `src/components/sections/`: page sections. They receive their data as props from the page
- `src/components/sanity/`: `RichText` (Portable Text) and `SanityImage` (next/image + Sanity CDN)
- `src/sanity/`: client and `sanityFetch`, GROQ queries, schema types, Studio structure
- `sanity.config.ts` / `sanity.cli.ts`: Studio and CLI config
- Components are server components by default; add `'use client'` only when a component needs state, effects, event handlers, or function props (e.g. `Nav.tsx`, `SanityImage.tsx`).
- Use `next/image` for images and `next/link` for internal links.

## Content (Sanity)

- Fetch with `sanityFetch({ query, tags: ["<documentType>"] })` so publishing revalidates the page.
- `homePage` and `siteSettings` are singletons (document ID = type name).
- After changing a schema or a `defineQuery` query, run `npm run typegen` to regenerate `src/sanity/types.ts`. Section prop types in `src/sanity/pageTypes.ts` derive from it.
- Import icons from `@sanity/icons` subpaths (`@sanity/icons/Cog`); the root entry no longer exports them.

## Development

```
npm run dev       # dev server at http://localhost:3000 (Studio at /studio)
npm run build     # production build (needs NEXT_PUBLIC_SANITY_* env vars and content)
npm run start     # serve the production build
npm run typegen   # regenerate Sanity types
```

## Documentation

- Next.js: https://nextjs.org/docs
- [App Router routing](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Images](https://nextjs.org/docs/app/getting-started/images)
- Tailwind CSS: https://tailwindcss.com/docs
- Sanity: https://www.sanity.io/docs
- next-sanity: https://github.com/sanity-io/next-sanity

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
