import type { Metadata } from "next"
import Nav from "@/components/Nav"
import { sanityFetch } from "@/sanity/client"
import { SITE_SETTINGS_QUERY } from "@/sanity/queries"
import "../globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] })
  const siteTitle = settings?.title ?? "UR Home"
  return {
    title: { default: siteTitle, template: `%s | ${siteTitle}` },
    icons: { icon: "/favicon.ico" },
  }
}

// The public site and the Studio (/studio) each have their own root layout,
// so the Studio doesn't inherit the site's Nav, fonts, or Tailwind base styles.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Nav />
        {children}
      </body>
    </html>
  )
}
