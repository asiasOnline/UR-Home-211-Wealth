import CtaButton from "@/components/CtaButton"
import ServiceCards from "@/components/ServiceCards"
import RichText from "@/components/sanity/RichText"
import type { HowWeHelpData } from "@/sanity/pageTypes"

const HowWeHelp = ({ data }: { data: HowWeHelpData }) => {
    return (
        <section className="flex flex-col justify-center items-center my-40 py-16 border-t-20 border-b-20 border-[#E1EAD7]">
            <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-center pb-4">{data.heading}</h2>
                <RichText value={data.intro} />
            </div>
            <ServiceCards services={data.services ?? []} />
            <div className="max-w-xl flex flex-col gap-10">
                <RichText value={data.footer} />
                <div className="mx-auto">
                    <CtaButton cta={data.cta} variant="default" size="xl" />
                </div>
            </div>
        </section>
    )
}

export default HowWeHelp
