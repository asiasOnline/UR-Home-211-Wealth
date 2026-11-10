import { createClient, type QueryParams } from "next-sanity"
import { apiVersion, dataset, projectId } from "./env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Pages are statically generated and revalidated on publish, so read straight
  // from the API rather than the CDN to avoid caching stale content twice.
  useCdn: false,
})

/**
 * Fetch from Sanity with Next.js caching. Pages stay static; publishing in the
 * Studio calls /api/revalidate (via a Sanity webhook), which revalidates the
 * document's `_type` tag. The hourly revalidate is a fallback in case a webhook
 * is missed.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString
  params?: QueryParams
  tags: string[]
}) {
  return client.fetch(query, params, {
    next: { revalidate: 3600, tags },
  })
}
