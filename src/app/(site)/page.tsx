import Hero from "@/components/sections/Hero"
import Mission from "@/components/sections/Mission"
import Stats from "@/components/sections/Stats"
import HowWeHelp from "@/components/sections/HowWeHelp"
import Qualifications from "@/components/sections/Qualifications"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Mission />
      <Stats />
      <HowWeHelp />
      <Qualifications />
    </main>
  )
}
