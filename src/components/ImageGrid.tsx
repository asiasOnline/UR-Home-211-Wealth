import twoHands from '@/assets/images/two-hands.png'
import momDaughter from '@/assets/images/mom-daughter.png'
import motherChildCouch from '@/assets/images/mother-child-couch.png'
import foodDrive from '@/assets/images/food-drive.png'
import LeafGraphic from './graphics/LeafGraphic'

interface GridImage {
  image: ImageMetadata
  alt: string
  styles: string
}

// Each image grows in proportion to its aspect ratio (9:9 and 16:9), so every row resolves to the same height
const square = "aspect-square grow-[9]"
const wide = "aspect-video grow-[16]"

const gridRows: GridImage[][] = [
    [
        {image: twoHands, alt: "Two people holding hands", styles: square},
        {image: foodDrive, alt: "Volunteers at a food drive", styles: wide},
    ],
    [
        {image: motherChildCouch, alt: "Mother and child on a couch",styles: wide},
        {image: momDaughter, alt: "Mother and daughter",  styles: square},
    ],
]

const ImageGrid = () => {
  return (
  <div className='relative'>
    <LeafGraphic color='#A4BF86' className='absolute w-24 -top-20 -left-12'/>
    <LeafGraphic color='#A4BF86' rotate={95} className='absolute w-16 top-45 -right-28'/>
    <LeafGraphic color='#A4BF86' rotate={45} className='absolute w-10 -bottom-24 -left-16'/>
    <div className='flex flex-col gap-4 w-full max-w-160 2xl:max-w-200'>
      {gridRows.map((row, i) => (
          <div key={i} className='flex items-start gap-4'>
              {row.map(({ image, alt, styles }) => (
                  <img
                  key={image.src}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={alt}
                  className={`block basis-0 min-w-0 h-auto object-cover rounded-2xl ${styles}`}
                  loading="lazy"
              />
              ))}
          </div>
      ))}
    </div>
  </div>
  )
}

export default ImageGrid
