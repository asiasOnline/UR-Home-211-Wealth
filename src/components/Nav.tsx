import { useState } from 'react';
import logo from '../assets/211-Wealth-primary-color-logo-svg.svg'
import { Button } from '@/components/ui/button';
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

interface NavLinkType {
  name: string 
  path: string
}

const navLinks: NavLinkType[] = [
  {name: 'Home', path: '/'},
  {name: 'About', path: '/about/'},
  {name: 'Programs', path: '/programs/'},
  {name: 'Events', path: '/events/'},
]

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='relative px-4 py-2 shadow-md/10 md:px-8'>
      <div className='flex items-center justify-between'>
        <div>
          {/* Logo */}
          <a href="/">
            <img 
              src={logo.src} 
              alt='211 Wealth Primary Color Logo'
              width={120}
              height={120}
              className='w-24 md:w-30'
            />
          </a>
        </div>
        {/* Nav Link Container */}
        <ul className='hidden items-center gap-8 md:flex'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.path}>
                {link.name}
              </a>
            </li>
          ))}
          <li className='mx-8'>
            <a href="/contact/">
              <Button variant={'secondary'} size={'lg'}>Contact Us</Button>
            </a>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <Button
          className='md:hidden'
          size="icon-lg"
          variant="ghost"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </Button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul id='mobile-menu' className='flex flex-col gap-4 py-4 md:hidden'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.path} className='block py-1' onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/contact/" onClick={() => setIsMenuOpen(false)}>
              <Button className='w-full' variant={'secondary'} size={'lg'}>Contact Us</Button>
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Nav