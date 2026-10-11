import content from "@/data/notion-content.json"

type Block = (typeof content.sections)[keyof typeof content.sections]["blocks"][number]

const blocksById = new Map<string, Block>(
  Object.values(content.sections).flatMap((section) =>
    section.blocks.map((block) => [block.id, block] as const)
  )
)

// Throws so a deleted or re-created Notion block fails the build instead of rendering blank.
export function getBlock(id: string): Block {
  const block = blocksById.get(id)
  if (!block) {
    throw new Error(`No block with id "${id}" in notion-content.json`)
  }
  return block
}
