import React from 'react'

interface RectContainer extends Omit<React.SVGProps<SVGSVGElement>, 'rotate'> {
  /** Fill color. Any CSS color, or "currentColor" to inherit from text color (e.g. Tailwind `text-*`). */
  color?: string;
}

const RectContainer: React.FC<RectContainer> = ({
  color = "#679436",
  style,
  ...props
}) => {
  return (
    <svg 
        width="500" 
        height="400"
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
        style={{ ...style }}
        >
    <path d="M487.769 312.898C481.34 364.873 461.778 382.034 379.835 390.481C299.733 398.62 219.127 401.542 138.018 399.238C73.8387 397.393 -2.25041 402.284 0.0509617 351.279L10.5941 126.216C11.7592 100.864 13.6434 74.0289 36.2113 52.7549C62.4757 27.9411 111.466 15.9801 158.328 9.22711C195.251 3.93069 232.662 0.911729 270.563 0.179056C308.464 -0.562443 346.12 1 383.503 4.84874C458.758 12.5286 483.469 29.9361 492.588 78.9192C507.043 156.556 497.565 235.031 487.769 312.898Z" fill={color}/>
    </svg>
  )
}

export default RectContainer


