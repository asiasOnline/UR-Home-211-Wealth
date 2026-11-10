import {
    Card,
    CardHeader,
    CardContent,
    CardDescription
} from "@/components/ui/card"
import RichText from "@/components/sanity/RichText"
import type { QualificationsData } from "@/sanity/pageTypes"
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiPath } from "react-icons/pi";

type QuestionCard = NonNullable<QualificationsData["cards"]>[number]

// Icon options offered in the Studio (see the "icon" field in src/sanity/schemaTypes/homePage.ts)
const icons = {
    home: GoHome,
    people: HiOutlineUserGroup,
    path: PiPath,
}

const QualificationCards = ({ cards }: { cards: QuestionCard[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12 px-4">
        {cards.map(({ _key, icon, title, description }) => {
            const Icon = icons[(icon ?? "home") as keyof typeof icons] ?? GoHome
            return (
            <Card className="px-2 py-6 w-full max-w-96" key={_key}>
            <CardHeader>
                <div className="flex justify-center">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#E1EAD7] rounded-full">
                    <Icon className="w-8 h-8"/>
                    </div>
                </div>
                <p className="text-base font-semibold text-center mt-3">{title}</p>
            </CardHeader>
            <CardContent className="flex flex-col">
                <CardDescription>
                    <RichText value={description} />
                </CardDescription>
            </CardContent>
        </Card>
            )
        })}
    </div>
  )
}

export default QualificationCards
