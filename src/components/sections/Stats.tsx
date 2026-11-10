import { Button } from "@/components/ui/button"
import StatGrid from "@/components/StatGrid"
import { getBlock } from "@/lib/notion-content"

const Stats = () => {
    const statHeader = getBlock("3f64fbaf-9f23-8019-9c27-dfae2747800c")
    const statParagraph = getBlock("3f64fbaf-9f23-80a9-b34e-c97c46fe0eed")
    const statButton = getBlock("3f84fbaf-9f23-80ae-8936-f69bedf57a9b")
    const statAsideHeader = getBlock("3f84fbaf-9f23-80c2-a393-e89bdc74c50e")

    return (
        <section className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24">
            <div className="max-w-lg flex flex-col mt-8 gap-4 lg:pb-16">
                <h2 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: statHeader.html ?? "" }} />
                <p dangerouslySetInnerHTML={{ __html: statParagraph.html ?? "" }} />
                <Button variant="outline" size="xl" className="self-start text-foreground">{statButton.text}</Button>
            </div>
            <aside>
                <p className="text-2xl font-heading font-semibold mb-8" dangerouslySetInnerHTML={{ __html: statAsideHeader.html ?? "" }} />
                <StatGrid />
            </aside>
        </section>
    )
}

export default Stats
