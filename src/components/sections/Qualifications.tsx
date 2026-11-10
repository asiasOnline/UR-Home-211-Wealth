import CtaButton from "@/components/CtaButton"
import QualificationCards from "@/components/QualificationCards"
import RectContainer from "@/components/graphics/RectContainer"
import RichText from "@/components/sanity/RichText"
import type { QualificationsData } from "@/sanity/pageTypes"
import { GoCheckCircle } from "react-icons/go"

const Qualifications = ({ data }: { data: QualificationsData }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold text-center pb-4">{data.heading}</h2>
            <div className="flex justify-center">
                <QualificationCards cards={data.cards ?? []} />
            </div>
            <div className="flex flex-col lg:flex-row gap-8 px-4">
                <div>
                    <div className="relative isolate px-10 py-12 text-white">
                        <RectContainer
                            className="absolute inset-0 w-full h-full -z-10"
                            preserveAspectRatio="none"
                        />
                        <h3 className="text-2xl font-semibold">{data.checklistHeading}</h3>
                        <ul>
                            {data.checklist?.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <GoCheckCircle className="w-6 h-6" />
                                    <p>{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <CtaButton cta={data.checklistCta} variant="outline" size="xl" />
                </div>
                <div>
                    <RichText value={data.footer} />
                    <CtaButton
                        cta={data.footerCta}
                        className="w-full"
                        variant="secondary"
                        size="lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default Qualifications
