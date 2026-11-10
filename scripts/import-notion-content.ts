/**
 * One-time import of the old Notion copy (scripts/notion-content.json) and the local
 * photos (src/assets/images) into Sanity's Home Page and Site Settings documents.
 *
 *   npm run content:import            # refuses if the Home Page already exists
 *   npm run content:import -- --force # overwrite it
 *
 * Runs through `sanity exec --with-user-token`, so it writes as whoever is logged in
 * with `npx sanity login`; no API token is needed.
 */
import { randomUUID } from "node:crypto"
import { createReadStream, readFileSync } from "node:fs"
import { basename, resolve } from "node:path"
import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-11-01" })
const force = process.argv.includes("--force")

type NotionBlock = { id: string; type: string; text?: string }
const notion = JSON.parse(readFileSync(resolve("scripts/notion-content.json"), "utf8")) as {
  sections: Record<string, { blocks: NotionBlock[] }>
}
const blocks = Object.values(notion.sections).flatMap((section) => section.blocks)

/** Text of the Notion block whose ID ends with `suffix` (the last 12 hex digits are unique). */
function text(suffix: string): string {
  const matches = blocks.filter((block) => block.id.endsWith(suffix))
  if (matches.length !== 1) throw new Error(`Expected one Notion block ending in ${suffix}, found ${matches.length}`)
  return (matches[0].text ?? "").trim()
}

const key = () => randomUUID().replaceAll("-", "").slice(0, 12)

/** Portable Text with one paragraph per argument. */
function paragraphs(...texts: string[]) {
  return texts.map((t) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: t, marks: [] }],
  }))
}

const cta = (label: string) => ({ _type: "cta", label })

const uploaded = new Map<string, string>()
async function image(file: string, alt: string, inArray = false) {
  let assetId = uploaded.get(file)
  if (!assetId) {
    const path = resolve("src/assets/images", file)
    const asset = await client.assets.upload("image", createReadStream(path), { filename: basename(path) })
    assetId = asset._id
    uploaded.set(file, assetId)
    console.log(`  uploaded ${file}`)
  }
  return {
    _type: "accessibleImage",
    ...(inArray ? { _key: key() } : {}),
    alt,
    asset: { _type: "reference", _ref: assetId },
  }
}

async function serviceCards() {
  const sources = [
    { title: "ecfd1b22d529", subtitle: "efcf7ff8667a", description: "edc839a3b8cd", file: "living-room.png", alt: "Brightly lit living room" },
    { title: "db1d484c0362", subtitle: "eb845216fed1", description: "e076f5849238", file: "canned-boxed-goods.png", alt: "Various boxed and canned goods" },
    { title: "f58e7fc78c6e", subtitle: "e1b84ca969a0", description: "d94f5f33c826", file: "hands-on-face.png", alt: "Woman holding her face in frustration" },
  ]
  const cards = []
  for (const s of sources) {
    cards.push({
      _type: "service",
      _key: key(),
      title: text(s.title),
      subtitle: text(s.subtitle),
      image: await image(s.file, s.alt),
      description: paragraphs(text(s.description)),
    })
  }
  return cards
}

async function main() {
  const existing = await client.fetch<string | null>(`*[_id == "homePage"][0]._id`)
  if (existing && !force) {
    console.error('A Home Page document already exists. Re-run with "-- --force" to overwrite it.')
    process.exit(1)
  }

  console.log(`Importing into ${client.config().projectId}/${client.config().dataset}`)

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      heading: text("ecc5711682c2"),
      subheading: paragraphs(text("d6f74f29ada4")),
      primaryCta: cta(text("eebad5b94db5")),
      secondaryCta: cta(text("e03dbc67f6a1")),
      images: [
        await image("two-hands.png", "Two people holding hands", true),
        await image("food-drive.png", "Volunteers at a food drive", true),
        await image("mother-child-couch.png", "Mother and child on a couch", true),
        await image("mom-daughter.png", "Mother and daughter", true),
      ],
    },
    mission: {
      heading: text("dff0524bd9fc"),
      body: paragraphs(text("fc3bb5c3506b"), text("c1484fde2815")),
      cta: cta(text("cc1fdf5894ba")),
      image: await image("four-women-hugging.png", "Four women hugging"),
    },
    stats: {
      heading: text("dfae2747800c"),
      body: paragraphs(text("c97c46fe0eed")),
      cta: cta(text("f69bedf57a9b")),
      asideHeading: text("e89bdc74c50e"),
      items: [
        ["d67aea8360b6", "df8cffe40f9c"],
        ["fb24ad64e537", "f3b22e46964f"],
        ["fa8df00b471b", "e533192b9899"],
        ["f217efd10f0a", "ca2c56ff3417"],
      ].map(([value, label]) => ({ _type: "stat", _key: key(), value: text(value), label: text(label) })),
    },
    howWeHelp: {
      heading: text("d1af694e884b"),
      intro: paragraphs(text("d49d51f62d7a")),
      services: await serviceCards(),
      footer: paragraphs(text("d1f52d5cc52c")),
      cta: cta(text("e4de2e367bd1")),
    },
    qualifications: {
      heading: text("f70979904b97"),
      intro: paragraphs(text("da8c62a27b93")),
      cards: [
        { icon: "home", title: "e6eedc6773c2", description: "ee5dc06be2af" },
        { icon: "people", title: "e7f7a69f6deb", description: "fc882066dc25" },
        { icon: "path", title: "e67cf444ba29", description: "d8de8bd9933f" },
      ].map((c) => ({
        _type: "questionCard",
        _key: key(),
        icon: c.icon,
        title: text(c.title),
        description: paragraphs(text(c.description)),
      })),
      checklistHeading: text("c974c6a154b8"),
      checklist: ["edec18e75d68", "e1c70ac37ef2", "e0255e68e6ee", "f1b6c0ccfb2f"].map(text),
      checklistCta: cta(text("dbcffe9e87a2")),
      footer: paragraphs(text("f932a66ee6cf")),
      footerCta: cta(text("ea69b8791e72")),
    },
    support: {
      heading: text("d4821c67ad94"),
      body: paragraphs(text("cbcc4f65e42f"), text("df5cf003068d"), text("f4fb67e51c51")),
      cta: cta(text("e918ec2ed9f9")),
    },
  }

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "UR Home",
    copyright: text("c23f487a73d9"),
  }

  await client
    .transaction()
    .createOrReplace(homePage)
    .createOrReplace(siteSettings)
    .commit()

  console.log("Imported Home Page and Site Settings (published).")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
