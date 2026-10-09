import { useState } from 'react';
import logo from '../assets/211-Wealth-primary-color-logo-svg.svg'
import { Button } from '@/components/ui/button';

const Nav = () => {
  return (
    <div className='flex items-center justify-between mx-8 my-2'>
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
        <nav className='flex items-center gap-8'>
          <a href="/">Home</a>
          <a href="/about/">About</a>
          <a href="/programs/">Programs</a>
          <a href="/events/">Events</a>
          <Button variant={'secondary'} size={'lg'}>Contact Us</Button>
        </nav>
    </div>
  )
}

export default Nav