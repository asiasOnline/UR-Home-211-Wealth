import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID
const db = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
});
console.log(db.data_sources);

