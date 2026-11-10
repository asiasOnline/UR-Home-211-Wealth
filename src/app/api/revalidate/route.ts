import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

/**
 * Called by a Sanity webhook when a document is published, so the site updates
 * within seconds instead of waiting for the hourly fallback revalidation.
 * Pages tag their fetches with the document `_type` (see sanityFetch).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return new NextResponse("SANITY_REVALIDATE_SECRET is not set", { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true)
    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 })
    }
    if (!body?._type) {
      return new NextResponse("Missing _type in webhook body", { status: 400 })
    }

    // Expire immediately so the first visitor after a publish already sees the change
    revalidateTag(body._type, { expire: 0 })
    return NextResponse.json({ revalidated: body._type, now: Date.now() })
  } catch (error) {
    console.error(error)
    return new NextResponse((error as Error).message, { status: 500 })
  }
}
