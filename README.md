# 211 Wealth – UR Home

Marketing site for 211 Wealth's UR Home, built with Next.js, React, Tailwind CSS, and Sanity.
Site content is edited in Sanity Studio at `/studio`.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Sanity project ID and dataset.
3. `npx sanity login`
4. Allow the site to talk to Sanity from the browser:
   `npx sanity cors add http://localhost:3000 --credentials`
5. `npm run dev`, then open http://localhost:3000 (site) and http://localhost:3000/studio (Studio).

## Commands

| Command                  | Action                                                           |
| :----------------------- | :--------------------------------------------------------------- |
| `npm run dev`            | Start the dev server at `localhost:3000`                         |
| `npm run build`          | Build the production site                                        |
| `npm run start`          | Serve the production build                                       |
| `npm run typegen`        | Regenerate TypeScript types from the Sanity schema and queries   |
| `npm run content:import` | One-time import of the old Notion copy and photos into Sanity    |

## Publishing updates

Pages are static and refresh every hour. To make published changes appear within seconds,
add a webhook in sanity.io/manage → API → Webhooks:

- URL: `https://<your-domain>/api/revalidate`
- Trigger on: Create, Update, Delete
- Projection: `{_type}`
- Secret: the same value as `SANITY_REVALIDATE_SECRET`
