import Link from "next/link"
import { PortableText, type PortableTextComponents } from "next-sanity"
import type { BlockContent } from "@/sanity/types"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#"
      return href.startsWith("/") ? (
        <Link href={href} className="underline underline-offset-2">{children}</Link>
      ) : (
        <a href={href} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">{children}</a>
      )
    },
  },
}

interface RichTextProps {
  value: BlockContent | null | undefined
  /** Classes for the wrapper. Each paragraph renders as its own <p> inside it. */
  className?: string
}

const RichText = ({ value, className }: RichTextProps) => {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}

export default RichText
