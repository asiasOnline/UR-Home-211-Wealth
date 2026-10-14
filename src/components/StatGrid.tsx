import { getBlock } from "@/lib/notion-content"

interface Stat {
  header: string
  description: string
  styles: string
}

// Some block types carry no html, so fall back to an empty string
const html = (id: string) => getBlock(id).html ?? ""

// Each stat rounds its outer corner and, on hover, slides away from the center of the grid
const topLeft = "rounded-tl-3xl group-hover:-translate-x-2 group-hover:-translate-y-2"
const topRight = "rounded-tr-3xl group-hover:translate-x-2 group-hover:-translate-y-2"
const bottomLeft = "rounded-bl-3xl group-hover:-translate-x-2 group-hover:translate-y-2"
const bottomRight = "rounded-br-3xl group-hover:translate-x-2 group-hover:translate-y-2"

const stats: Stat[] = [
    {
        header: html("3f64fbaf-9f23-8089-81bd-d67aea8360b6"),
        description: html("3f64fbaf-9f23-8002-ab87-df8cffe40f9c"),
        styles: topLeft,
    },
    {
        header: html("3f64fbaf-9f23-80be-8ba8-fb24ad64e537"),
        description: html("3f64fbaf-9f23-80fc-9fd9-f3b22e46964f"),
        styles: topRight,
    },
    {
        header: html("3f64fbaf-9f23-8089-9de0-fa8df00b471b"),
        description: html("3f64fbaf-9f23-80ff-93a8-e533192b9899"),
        styles: bottomLeft,
    },
    {
        header: html("3f64fbaf-9f23-80b6-b602-f217efd10f0a"),
        description: html("3f64fbaf-9f23-80d1-9670-ca2c56ff3417"),
        styles: bottomRight,
    },
]

const StatGrid = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
      {stats.map(({ header, description, styles }, i) => (
          // The outer cell stays put and owns the hover, so the stat doesn't flicker as it slides out from under the cursor
          <div key={i} className='group max-w-60'>
              <div className={`h-full min-h-48 px-8 flex flex-col gap-4 justify-center border bg-white transition duration-300 ease-out group-hover:bg-[#1D7699] group-hover:text-[#FFFFFA] group-hover:shadow-xl ${styles}`}>
                  <div className='text-right'>
                      <p className='text-4xl font-heading font-bold' dangerouslySetInnerHTML={{ __html: header }} />
                  </div>
                  <div className='text-left'>
                      <p dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
              </div>
          </div>
      ))}
    </div>
  )
}

export default StatGrid
