import SanityImage, { type SanityImageData } from '@/components/sanity/SanityImage'
import LeafGraphic from './graphics/LeafGraphic'

// Each image grows in proportion to its aspect ratio (9:9 and 16:9), so every row resolves to the same height
const square = { styles: "aspect-square grow-[9]", ratio: 1 }
const wide = { styles: "aspect-video grow-[16]", ratio: 16 / 9 }

// Photos fill the grid left to right, top to bottom: square, wide / wide, square
const layout = [[square, wide], [wide, square]]

const ImageGrid = ({ images }: { images: SanityImageData[] }) => {
  return (
  <div className='relative'>
    <LeafGraphic color='#A4BF86' className='absolute w-24 -top-20 -left-12'/>
    <LeafGraphic color='#A4BF86' rotate={95} className='absolute w-16 top-45 -right-28'/>
    <LeafGraphic color='#A4BF86' rotate={45} className='absolute w-10 -bottom-24 -left-16'/>
    <div className='flex flex-col gap-4 w-full max-w-160 2xl:max-w-200'>
      {layout.map((row, i) => (
          <div key={i} className='flex items-start gap-4'>
              {row.map(({ styles, ratio }, j) => (
                  <SanityImage
                    key={j}
                    image={images[i * row.length + j]}
                    aspectRatio={ratio}
                    width={ratio === 1 ? 300 : 530}
                    sizes="(min-width: 1536px) 530px, (min-width: 1024px) 420px, 60vw"
                    className={`block basis-0 min-w-0 h-auto object-cover rounded-2xl ${styles}`}
                  />
              ))}
          </div>
      ))}
    </div>
  </div>
  )
}

export default ImageGrid
