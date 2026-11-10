import CtaButton from "@/components/CtaButton"
import ImageGrid from "@/components/ImageGrid"
import RichText from "@/components/sanity/RichText"
import type { HeroData } from "@/sanity/pageTypes"

const Hero = ({ data }: { data: HeroData }) => {
    return (
        <section id="hero" className="py-6 px-8 mt-10 overflow-x-clip flex flex-col lg:flex-row gap-10 items-center justify-center">
            <div className="max-w-lg flex flex-col gap-4">
                <h1 className="text-5xl font-heading font-bold leading-[120%]">{data.heading}</h1>
                <RichText value={data.subheading} className="text-xl" />
                <div className="flex gap-4">
                    <CtaButton cta={data.primaryCta} variant="default" size="xl" />
                    <CtaButton cta={data.secondaryCta} variant="outline" size="xl" />
                </div>
            </div>
            <ImageGrid images={data.images ?? []} />
        </section>
    )
}

export default Hero
