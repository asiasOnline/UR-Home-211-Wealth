import type { StatsData } from "@/sanity/pageTypes"

type Stat = NonNullable<StatsData["items"]>[number]

// Each stat rounds its outer corner and, on hover, slides away from the center of the grid
const cornerStyles = [
    "rounded-tl-3xl group-hover:-translate-x-2 group-hover:-translate-y-2",
    "rounded-tr-3xl group-hover:translate-x-2 group-hover:-translate-y-2",
    "rounded-bl-3xl group-hover:-translate-x-2 group-hover:translate-y-2",
    "rounded-br-3xl group-hover:translate-x-2 group-hover:translate-y-2",
]

const StatGrid = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
      {stats.slice(0, 4).map(({ _key, value, label }, i) => (
          // The outer cell stays put and owns the hover, so the stat doesn't flicker as it slides out from under the cursor
          <div key={_key} className='group max-w-64'>
              <div className={`h-full min-h-52 px-8 flex flex-col gap-4 justify-center border bg-white transition duration-300 ease-out group-hover:bg-[#1D7699] group-hover:text-[#FFFFFA] group-hover:shadow-xl ${cornerStyles[i]}`}>
                  <div className='text-center'>
                      <p className='text-4xl font-heading font-bold'>{value}</p>
                  </div>
                  <div className='text-left'>
                      <p>{label}</p>
                  </div>
              </div>
          </div>
      ))}
    </div>
  )
}

export default StatGrid
