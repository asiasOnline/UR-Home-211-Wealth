// Convenience aliases for each home page section, derived from the generated query types.
// Regenerate the source types with `npm run typegen` after changing a schema or query.
import type { HOME_PAGE_QUERY_RESULT } from "./types"

type HomePage = NonNullable<HOME_PAGE_QUERY_RESULT>

export type HeroData = NonNullable<HomePage["hero"]>
export type MissionData = NonNullable<HomePage["mission"]>
export type StatsData = NonNullable<HomePage["stats"]>
export type HowWeHelpData = NonNullable<HomePage["howWeHelp"]>
export type QualificationsData = NonNullable<HomePage["qualifications"]>
