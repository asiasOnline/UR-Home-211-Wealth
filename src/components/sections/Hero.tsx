import { Button } from "@/components/ui/button"
import { getBlock } from "@/lib/notion-content"
import ImageGrid from "@/components/ImageGrid"

const Hero = () => {
    const heroHeader = getBlock("3f64fbaf-9f23-801f-b557-ecc5711682c2")
    const heroSubheader = getBlock("3f64fbaf-9f23-8041-a680-d6f74f29ada4")
    const heroPrimaryButton = getBlock("3f64fbaf-9f23-80c1-a647-eebad5b94db5")
    const heroSecondaryButton = getBlock("3f64fbaf-9f23-80e7-ad34-e03dbc67f6a1")

    return (
        <section id="hero" className="py-6 px-8 mt-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
            <div className="max-w-lg flex flex-col gap-4">
                <h1 className="text-5xl font-heading font-bold leading-[120%]" dangerouslySetInnerHTML={{ __html: heroHeader.html ?? "" }} />
                <p className="text-xl" dangerouslySetInnerHTML={{ __html: heroSubheader.html ?? "" }} />
                <div className="flex gap-4">
                    <Button variant="default" size="xl">{heroPrimaryButton.text}</Button>
                    <Button variant="outline" size="xl">{heroSecondaryButton.text}</Button>
                </div>
            </div>
            <ImageGrid />
        </section>
    )
}

export default Hero
