import CtaButton from "@/components/CtaButton"
import StatGrid from "@/components/StatGrid"
import RichText from "@/components/sanity/RichText"
import type { StatsData } from "@/sanity/pageTypes"

const Stats = ({ data }: { data: StatsData }) => {
    return (
        <section className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24">
            <div className="max-w-lg flex flex-col mt-8 gap-4 lg:pb-16">
                <h2 className="text-3xl font-bold">{data.heading}</h2>
                <RichText value={data.body} />
                <CtaButton cta={data.cta} variant="outline" size="xl" className="self-start text-foreground" />
            </div>
            <aside>
                {data.asideHeading && (
                    <p className="text-2xl font-heading font-semibold mb-8">{data.asideHeading}</p>
                )}
                <StatGrid stats={data.items ?? []} />
            </aside>
        </section>
    )
}

export default Stats
