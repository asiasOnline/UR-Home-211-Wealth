import { notFound } from "next/navigation"
import Hero from "@/components/sections/Hero"
import Mission from "@/components/sections/Mission"
import Stats from "@/components/sections/Stats"
import HowWeHelp from "@/components/sections/HowWeHelp"
import Qualifications from "@/components/sections/Qualifications"
import { sanityFetch } from "@/sanity/client"
import { HOME_PAGE_QUERY } from "@/sanity/queries"

export default async function HomePage() {
  const page = await sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] })
  if (!page) notFound()

  return (
    <main>
      {page.hero && <Hero data={page.hero} />}
      {page.mission && <Mission data={page.mission} />}
      {page.stats && <Stats data={page.stats} />}
      {page.howWeHelp && <HowWeHelp data={page.howWeHelp} />}
      {page.qualifications && <Qualifications data={page.qualifications} />}
    </main>
  )
}
