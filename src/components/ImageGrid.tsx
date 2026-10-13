import twoHands from '@/assets/images/two-hands.png'
import momDaughter from '@/assets/images/mom-daughter.png'
import motherChildCouch from '@/assets/images/mother-child-couch.png'
import foodDrive from '@/assets/images/food-drive.png'

interface GridImage {
  image: ImageMetadata
  alt: string
  styles: string
}

const gridImages: GridImage[] = [
    {image: twoHands, alt: "Two people holding hands", styles: "aspect-square"},
    {image: momDaughter, alt: "Mother and daughter", styles: "aspect-video"},
    {image: motherChildCouch, alt: "Mother and child on a couch", styles: "aspect-square"},
    {image: foodDrive, alt: "Volunteers at a food drive", styles: "aspect-video"}
]

const ImageGrid = () => {
  return (
    <div className='grid grid-cols-[minmax(0,9fr)_minmax(0,16fr)] gap-4 max-w-160'>
        {gridImages.map(({ image, alt, styles }) => (
            <img
            key={image.src}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={alt}
            className={`block w-full h-auto object-cover rounded-2xl ${styles}`}
            loading="lazy"
        />
        ))}
    </div>
  )
}

export default ImageGrid
