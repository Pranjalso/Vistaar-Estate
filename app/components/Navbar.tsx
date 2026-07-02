'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Properties', href: '/explore' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-12 sm:h-14 md:h-16 lg:h-[72px]">
              <Image
                src="/logo.png"
                alt="Vistaar Estate"
                fill
                sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  pathname === link.href
                    ? 'text-[#d4af37]'
                    : 'text-[#1a1a2e] hover:text-[#d4af37]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <a
              href="tel:+919999999999"
              className="group relative flex items-center gap-2 px-6 py-2.5 bg-[#d4af37] text-white rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#d4af37]/30 hover:scale-105 active:scale-95 text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Phone size={16} className="group-hover:animate-pulse" />
              <span>Call Us</span>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-[#1a1a2e]" /> : <Menu size={24} className="text-[#1a1a2e]" />}
          </button>
        </div>

        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-1 bg-white rounded-lg shadow-lg border border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 transition-colors text-sm ${
                  pathname === link.href
                    ? 'text-[#d4af37] bg-amber-50'
                    : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-amber-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar