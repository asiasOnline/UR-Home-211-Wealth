import { getBlock } from "@/lib/notion-content"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent,
    CardDescription
} from "@/components/ui/card"
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiPath } from "react-icons/pi";

interface CardProps {
    icon: React.ReactElement
    title: string
    description: string
}

// Some block types carry no html, so fall back to an empty string
const html = (id: string) => getBlock(id).html ?? ""

const cards: CardProps[] = [
    {
        icon: <GoHome className="w-8 h-8"/>,
        title: html("3f84fbaf-9f23-8081-bceb-e6eedc6773c2"), 
        description: html("3f84fbaf-9f23-807f-83cd-ee5dc06be2af"),
    },
    {
        icon: <HiOutlineUserGroup className="w-8 h-8"/>,
        title: html("3f84fbaf-9f23-801c-84e7-e7f7a69f6deb"), 
        description: html("3f84fbaf-9f23-809c-95a8-fc882066dc25"),
    },
    {
        icon: <PiPath className="w-8 h-8"/>,
        title: html("3f84fbaf-9f23-805c-ac10-e67cf444ba29"), 
        description: html("3f84fbaf-9f23-8034-970b-d8de8bd9933f"),
    }
]

const QualificationCards = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12">
        {cards.map(({icon, title, description}, i) => (
            <Card className="px-2 py-6 w-96" key={title}>
            <CardHeader>
                <div className="flex justify-center">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#E1EAD7] rounded-full">
                    {icon}
                    </div>
                </div>
                <p className="text-base font-semibold text-center mt-3" dangerouslySetInnerHTML={{ __html: title}}/>
            </CardHeader>
            <CardContent className="flex flex-col">
                <CardDescription dangerouslySetInnerHTML={{ __html: description}} />
            </CardContent>
        </Card>
        ))}
    </div>
  )
}

export default QualificationCards