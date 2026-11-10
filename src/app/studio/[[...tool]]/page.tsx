/**
 * Sanity Studio, served at /studio. Its config lives in sanity.config.ts at the project root.
 * https://github.com/sanity-io/next-sanity
 */
import { NextStudio } from "next-sanity/studio"
import config from "../../../../sanity.config"

export const dynamic = "force-static"

export default function StudioPage() {
  return <NextStudio config={config} />
}
