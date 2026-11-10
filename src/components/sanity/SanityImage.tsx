"use client"

// A client component because next/image's `loader` is a function, which can't be
// passed from a server component.
import Image, { type ImageProps } from "next/image"
import { urlFor } from "@/sanity/image"
import type { SanityImageCrop, SanityImageHotspot } from "@/sanity/types"

export interface SanityImageData {
  alt: string | null
  crop: SanityImageCrop | null
  hotspot: SanityImageHotspot | null
  asset: {
    _id: string
    metadata: { dimensions: { width: number; height: number } | null; lqip: string | null } | null
  } | null
}

interface SanityImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height" | "loader"> {
  image: SanityImageData | null | undefined
  /** Crop to this width / height ratio on Sanity's CDN, centered on the editor's hotspot. */
  aspectRatio?: number
  /** Rendered width hint. Defaults to the image's original width. */
  width?: number
}

const SanityImage = ({ image, aspectRatio, width, ...props }: SanityImageProps) => {
  if (!image?.asset) return null

  const source = {
    asset: { _ref: image.asset._id },
    crop: image.crop ?? undefined,
    hotspot: image.hotspot ?? undefined,
  }
  const original = image.asset.metadata?.dimensions ?? { width: 1200, height: 800 }
  const ratio = aspectRatio ?? original.width / original.height
  const renderWidth = width ?? original.width

  return (
    <Image
      {...props}
      src={urlFor(source).url()}
      alt={image.alt ?? ""}
      width={renderWidth}
      height={Math.round(renderWidth / ratio)}
      loader={({ width: w, quality }) => {
        let url = urlFor(source).width(w).quality(quality ?? 75).auto("format")
        if (aspectRatio) url = url.height(Math.round(w / aspectRatio)).fit("crop")
        return url.url()
      }}
      placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset.metadata?.lqip ?? undefined}
    />
  )
}

export default SanityImage
