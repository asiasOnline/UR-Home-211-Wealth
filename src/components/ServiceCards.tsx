import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card"
import RichText from "@/components/sanity/RichText"
import SanityImage from "@/components/sanity/SanityImage"
import type { HowWeHelpData } from "@/sanity/pageTypes"

type Service = NonNullable<HowWeHelpData["services"]>[number]

const ServiceCards = ({ services }: { services: Service[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12">
        {services.map(({ _key, title, subtitle, image, description }) => (
            <Card className="px-2 py-6 w-80" key={_key}>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <SanityImage
                    image={image}
                    width={384}
                    sizes="288px"
                    className="rounded-2xl w-full h-auto"
                />
                {subtitle && <p className="text-base font-semibold">{subtitle}</p>}
                <CardDescription>
                    <RichText value={description} />
                </CardDescription>
            </CardContent>
        </Card>
        ))}
    </div>
  )
}

export default ServiceCards
