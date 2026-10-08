import { useState } from 'react';
import logo from '../assets/211-Wealth-primary-color-logo-svg.svg'

const Nav = () => {
  return (
    <div className='flex justify-between'>
        <div>
          <a href="/">
            <img 
              src={logo.src} 
              alt='211 Wealth Primary Color Logo'
              width={120}
              height={120}
            />
          </a>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/about/">About</a>
          <a href="/programs/">Programs</a>
          <a href="/events/">Events</a>
        </nav>
    </div>
  )
}

export default Nav