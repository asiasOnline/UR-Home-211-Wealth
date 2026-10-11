import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@notionhq/client";

const OUTPUT_PATH = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../data/notion-content.json",
);

const { NOTION_TOKEN, NOTION_PAGE_ID } = process.env;
if (!NOTION_TOKEN || !NOTION_PAGE_ID) {
    console.error("Missing NOTION_TOKEN or NOTION_PAGE_ID in .env");
    process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

const escapeHtml = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const toPlainText = (richText = []) =>
    richText.map((part) => part.plain_text).join("");

// Inline HTML for a Notion rich text array (bold, italic, links, etc.)
const toHtml = (richText = []) =>
    richText
        .map((part) => {
            const { bold, italic, strikethrough, underline, code } =
                part.annotations;
            let html = escapeHtml(part.plain_text).replaceAll("\n", "<br>");
            if (code) html = `<code>${html}</code>`;
            if (bold) html = `<strong>${html}</strong>`;
            if (italic) html = `<em>${html}</em>`;
            if (strikethrough) html = `<s>${html}</s>`;
            if (underline) html = `<u>${html}</u>`;
            if (part.href) html = `<a href="${escapeHtml(part.href)}">${html}</a>`;
            return html;
        })
        .join("");

async function getChildren(blockId) {
    const blocks = [];
    let cursor;
    do {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 100,
        });
        blocks.push(...response.results);
        cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);
    return blocks;
}

async function simplifyBlock(block) {
    const data = block[block.type] ?? {};
    const simplified = { id: block.id, type: block.type };

    if (data.rich_text) {
        simplified.text = toPlainText(data.rich_text);
        simplified.html = toHtml(data.rich_text);
    }

    if (["image", "video", "file", "pdf"].includes(block.type)) {
        // Notion-hosted file URLs expire after about an hour; external URLs don't.
        simplified.url = data[data.type]?.url;
        simplified.caption = toPlainText(data.caption);
    }
    if (block.type === "to_do") simplified.checked = data.checked;
    if (block.type === "code") simplified.language = data.language;
    if (block.type === "bookmark" || block.type === "embed") {
        simplified.url = data.url;
    }

    if (block.has_children && block.type !== "child_page") {
        simplified.children = await simplifyBlocks(await getChildren(block.id));
    }
    return simplified;
}

async function simplifyBlocks(blocks) {
    const simplified = [];
    for (const block of blocks) {
        simplified.push(await simplifyBlock(block));
    }
    return simplified;
}

// Each Heading 1 starts a new section, keyed by a slug of its text.
// Anything above the first Heading 1 lands in "intro".
function groupIntoSections(blocks) {
    const sections = {};
    let current;
    for (const block of blocks) {
        if (block.type === "heading_1") {
            const key = slugify(block.text) || block.id;
            current = sections[key] = { title: block.text, blocks: [] };
            continue;
        }
        // Skip the empty paragraphs Notion leaves between blocks
        if (block.type === "paragraph" && !block.text && !block.children) {
            continue;
        }
        current ??= sections.intro = { title: "", blocks: [] };
        current.blocks.push(block);
    }
    return sections;
}

const page = await notion.pages.retrieve({ page_id: NOTION_PAGE_ID });
const titleProperty = Object.values(page.properties).find(
    (property) => property.type === "title",
);
const blocks = await simplifyBlocks(await getChildren(NOTION_PAGE_ID));

const content = {
    pageId: page.id,
    title: toPlainText(titleProperty?.title),
    lastEditedTime: page.last_edited_time,
    sections: groupIntoSections(blocks),
};

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, JSON.stringify(content, null, 2) + "\n");

const sectionKeys = Object.keys(content.sections);
console.log(
    `Pulled "${content.title}" (${sectionKeys.length} sections: ${sectionKeys.join(", ") || "none"})`,
);
console.log(`Wrote ${OUTPUT_PATH}`);
