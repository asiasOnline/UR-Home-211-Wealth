import React from 'react'

interface WaveProps extends React.SVGProps<SVGSVGElement> {
  /** Fill color. Any CSS color, or "currentColor" to inherit from text color (e.g. Tailwind `text-*`). */
  color?: string;
}

const Wave: React.FC<WaveProps> = ({ color = "#1D7699", ...props }) => {
  return (
    <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,154.7C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" fill={color}/>
    </svg>
  )
}

export default Wave
