import React from 'react'

interface LeafGraphicProps extends Omit<React.SVGProps<SVGSVGElement>, 'rotate'> {
  /** Fill color. Any CSS color, or "currentColor" to inherit from text color (e.g. Tailwind `text-*`). */
  color?: string;
  /** Rotation in degrees. */
  rotate?: number;
}

const LeafGraphic: React.FC<LeafGraphicProps> = ({
  color = "#679436",
  rotate = 0,
  style,
  ...props
}) => {
  return (
    <svg
        width="216"
        height="164"
        viewBox="0 0 216 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
        style={{ rotate: `${rotate}deg`, ...style }}
    >
        <path d="M144.583 132.255C85.0887 175.755 0.286621 160.661 0.286621 160.661C0.286621 160.661 11.9116 75.0313 71.4116 31.3959C130.906 -12.2448 215.708 2.98961 215.708 2.98961C215.708 2.98961 204.083 88.7552 144.583 132.255Z" fill={color}/>
    </svg>
  )
}

export default LeafGraphic
