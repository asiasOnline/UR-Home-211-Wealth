export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-01"

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET (see .env.example)"
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID (see .env.example)"
)

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined || value === "") {
    throw new Error(errorMessage)
  }
  return value
}
