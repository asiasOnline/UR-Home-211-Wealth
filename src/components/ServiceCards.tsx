import { getBlock } from "@/lib/notion-content"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent,
    CardDescription
} from "@/components/ui/card"
import LivingRoom from "@/assets/images/living-room.png"
import FoodDriveGoods from "@/assets/images/canned-boxed-goods.png"
import WomanFrustrated from "@/assets/images/hands-on-face.png"

interface CardProps {
  title: string
  subTitle: string
  imageSrc: ImageMetadata
  imageAlt: string
  description: string
}

// Some block types carry no html, so fall back to an empty string
const html = (id: string) => getBlock(id).html ?? ""

const cards: CardProps[] = [
    {
        title: html("3f84fbaf-9f23-808c-91ec-ecfd1b22d529"), 
        subTitle: html("3f84fbaf-9f23-8077-94e5-efcf7ff8667a"),
        imageSrc: LivingRoom,
        imageAlt: 'Brightly lit living room', 
        description: html("3f84fbaf-9f23-80bd-83d7-edc839a3b8cd"),
    },
    {
        title: html("3f84fbaf-9f23-8039-a1f6-db1d484c0362"), 
        subTitle: html("3f84fbaf-9f23-807a-b165-eb845216fed1"),
        imageSrc: FoodDriveGoods,
        imageAlt: 'Various boxed and canned goods', 
        description: html("3f84fbaf-9f23-80d8-91cc-e076f5849238"),
    },
    {
        title: html("3f84fbaf-9f23-80ea-a8c1-f58e7fc78c6e"), 
        subTitle: html("3f84fbaf-9f23-8092-9ea3-e1b84ca969a0"),
        imageSrc: WomanFrustrated,
        imageAlt: 'Woman holding her face in frustration', 
        description: html("3f84fbaf-9f23-8091-8184-d94f5f33c826"),
    }
]

const ServiceCards = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12">
        {cards.map(({title, subTitle, imageSrc, imageAlt, description}, i) => (
            <Card className="px-2 py-6 w-80" key={title}>
            <CardHeader>
                <CardTitle className="text-xl" dangerouslySetInnerHTML={{ __html: title}}/>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <img 
                    src={imageSrc.src}
                    alt={imageAlt}
                    className="rounded-2xl w-full h-auto"
                    width={320}
                    height={240}
                />
                <p className="text-base font-semibold" dangerouslySetInnerHTML={{ __html: subTitle}}/>
                <CardDescription dangerouslySetInnerHTML={{ __html: description}} />
            </CardContent>
        </Card>
        ))}
    </div>
  )
}

export default ServiceCards