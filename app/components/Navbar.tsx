'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  const PHONE_NUMBER = '+919999999999'
  const DISPLAY_PHONE = '+91 99999 99999'

  // Check if we're on the homepage
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Only track sections on homepage
      if (isHomePage) {
        // Always prioritize hero section when at the very top
        if (window.scrollY < 100) {
          setActiveSection('hero')
        } else {
          const sections = ['properties', 'blog', 'about', 'contact']
          const scrollPosition = window.scrollY + 100

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section)
                break
              }
            }
          }
        }
      }
    }

    // Initial check when component mounts
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  // If we navigate to the root with a hash (e.g. /#properties), set the active section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (pathname === '/') {
        const hash = window.location.hash.replace('#', '')
        if (hash) {
          setActiveSection(hash)
        } else if (window.scrollY < 100) {
          setActiveSection('hero')
        }
      } else {
        // Clear section tracking on non-root pages
        setActiveSection('')
      }
    }
  }, [pathname])

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        setIsOpen(false)
      }
    } else {
      window.location.href = `/#${id}`
      setIsOpen(false)
    }
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setActiveSection('hero')
      setIsOpen(false)
    }
  }

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `tel:${PHONE_NUMBER}`
  }

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/', id: 'hero' },
    { name: 'Properties', href: isHomePage ? '#properties' : '/#properties', id: 'properties' },
    { name: 'Blog', href: '/blog', id: 'blog' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ]

  // Check if a link is active
  const isLinkActive = (link: typeof navLinks[0]) => {
    // On the homepage, use section tracking
    if (isHomePage) {
      return activeSection === link.id || (link.id === 'hero' && (activeSection === 'hero' || activeSection === ''))
    }

    // Off the homepage, match routes. Blog should be active for blog list and detail pages.
    if (link.id === 'blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/')
    }

    if (link.href && link.href.startsWith('/')) {
      return pathname === link.href
    }

    return false
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center shrink-0 cursor-pointer"
            >
              <div className="relative w-[150px] sm:w-[180px] md:w-[200px] h-12 sm:h-14 md:h-16">
                <Image
                  src="/logo.png"
                  alt="Vistaar Estate"
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link)

                // For Home - use Link with smooth scroll handler
                if (link.name === 'Home') {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={handleHomeClick}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                        isActive
                          ? 'text-[#d4af37] bg-amber-50/80'
                          : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                      )}
                    </Link>
                  )
                }
                
                // For Blog, About, Contact - scroll on homepage, navigate otherwise
                if (link.href.startsWith('/') && !link.href.startsWith('#')) {
                  // Blog: scroll to section when on homepage, otherwise go to /blog
                  if (link.id === 'blog') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                        )}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                        )}
                      </Link>
                    )
                  }

                  // About & Contact: scroll to section on homepage, navigate to page otherwise
                  if (link.id === 'about' || link.id === 'contact') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                        )}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                        )}
                      </Link>
                    )
                  }

                  // Fallback
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                        isActive
                          ? 'text-[#d4af37] bg-amber-50/80'
                          : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                      )}
                    </Link>
                  )
                }
                
                // For Properties - use button with scroll
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                      isActive
                        ? 'text-[#d4af37] bg-amber-50/80'
                        : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full" />
                    )}
                  </button>
                )
              })}
              
              {/* Call Button with Tooltip */}
              <div 
                className="relative ml-4 hidden lg:block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={handlePhoneCall}
                  className="group relative flex items-center gap-2 px-6 py-2.5 bg-[#d4af37] text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-105 active:scale-95 text-sm font-medium overflow-hidden cursor-pointer"
                  aria-label={`Call us at ${DISPLAY_PHONE}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#c49b2a] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    <Phone size={16} className="group-hover:animate-pulse" />
                    <span>Call Now</span>
                  </span>
                </a>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap transition-all duration-200 animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-[#d4af37]" />
                      <span className="font-mono tracking-wider">{DISPLAY_PHONE}</span>
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-1 border-t border-gray-100">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link)

                // For Home
                if (link.name === 'Home') {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleHomeClick(e)
                        setIsOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                        isActive
                          ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                          : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                }
                
                // For Blog, About, Contact: scroll on homepage, navigate otherwise
                if (link.href.startsWith('/') && !link.href.startsWith('#')) {
                  if (link.id === 'blog') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.id)
                          setIsOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  }

                  if (link.id === 'about' || link.id === 'contact') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.id)
                          setIsOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm ${
                          isActive
                            ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                            : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  }

                  // fallback
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                        isActive
                          ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                          : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                }
                
                // For Properties
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                      isActive
                        ? 'text-[#d4af37] bg-amber-50/80 font-medium'
                        : 'text-gray-700 hover:text-[#d4af37] hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  )
}

export default Navbar