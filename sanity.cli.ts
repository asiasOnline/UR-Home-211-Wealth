/**
 * Config for the `sanity` CLI (schema extract, typegen, exec, dataset commands).
 * The CLI doesn't read Next.js env files on its own, so load them here.
 */
import { defineCliConfig } from "sanity/cli"

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file)
  } catch {
    // File doesn't exist; fine
  }
}

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  schemaExtraction: {
    path: "./src/sanity/extract.json",
    enforceRequiredFields: true,
  },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "./src/sanity/extract.json",
    generates: "./src/sanity/types.ts",
    overloadClientMethods: true,
  },
})
