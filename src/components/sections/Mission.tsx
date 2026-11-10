import CtaButton from "@/components/CtaButton"
import Wave from "@/components/graphics/Wave"
import RichText from "@/components/sanity/RichText"
import SanityImage from "@/components/sanity/SanityImage"
import type { MissionData } from "@/sanity/pageTypes"

const Mission = ({ data }: { data: MissionData }) => {
    return (
        // Bottom margin makes room for the half of the photo that hangs below the wave
        <section className="my-52 mb-64">
            {/* viewBox is cropped to just the crest so the solid block below continues the wave */}
            <Wave viewBox="0 80 1440 80" className="block w-full h-auto -mb-px pointer-events-none -scale-x-100" />
            <div className="bg-[#1D7699] text-[#FFFFFA] px-8 pt-6">
                <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center lg:flex-row gap-16 xl:gap-24">
                    <div className="w-full max-w-137.5 -mt-20 translate-y-1/6 lg:m-0 lg:translate-y-1/3">
                        <SanityImage
                            image={data.image}
                            className="rounded-2xl w-full h-auto"
                            width={640}
                            sizes="(min-width: 1024px) 550px, 100vw"
                        />
                    </div>
                    <div className="max-w-lg flex flex-col mt-8 gap-4 lg:pb-16">
                        <h2 className="text-3xl font-bold">{data.heading}</h2>
                        <RichText value={data.body} className="flex flex-col gap-4" />
                        <CtaButton cta={data.cta} variant="outline" size="xl" className="self-start text-foreground" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Mission
