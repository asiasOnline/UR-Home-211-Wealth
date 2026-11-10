import Link from "next/link"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import type { Cta } from "@/sanity/types"

type CtaButtonProps = Omit<ComponentProps<typeof Button>, "children" | "render" | "nativeButton"> & {
  cta: Cta | null | undefined
}

/** A Button whose label (and optional link) is edited in Sanity. Renders nothing without a label. */
const CtaButton = ({ cta, ...props }: CtaButtonProps) => {
  if (!cta?.label) return null
  if (cta.href) {
    return (
      <Button {...props} nativeButton={false} render={<Link href={cta.href} />}>
        {cta.label}
      </Button>
    )
  }
  return <Button {...props}>{cta.label}</Button>
}

export default CtaButton
