import { defineQuery } from "next-sanity"

// Everything an image needs to render with next/image: crop/hotspot for the URL builder,
// intrinsic size for layout, and alt text.
const image = /* groq */ `{
  alt,
  crop,
  hotspot,
  asset->{ _id, metadata { dimensions { width, height }, lqip } }
}`

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{ title, copyright }`)

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
  hero {
    heading,
    subheading,
    primaryCta,
    secondaryCta,
    images[] ${image}
  },
  mission {
    heading,
    body,
    cta,
    image ${image}
  },
  stats {
    heading,
    body,
    cta,
    asideHeading,
    items[] { _key, value, label }
  },
  howWeHelp {
    heading,
    intro,
    services[] { _key, title, subtitle, description, image ${image} },
    footer,
    cta
  },
  qualifications {
    heading,
    cards[] { _key, icon, title, description },
    checklistHeading,
    checklist,
    checklistCta,
    footer,
    footerCta
  }
}`)
