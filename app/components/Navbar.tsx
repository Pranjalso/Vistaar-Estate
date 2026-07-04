'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const tooltipTimeoutRef = useRef<NodeJS.Timeout>()

  const PHONE_NUMBER = '+919999999999'
  const DISPLAY_PHONE = '+91 99999 99999'

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Handle visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      // Handle scroll state - trigger at 60px for smoother transition
      setIsScrolled(currentScrollY > 60)

      // Track sections on homepage
      if (isHomePage) {
        if (currentScrollY < 100) {
          setActiveSection('hero')
        } else {
          const sections = ['properties', 'blog', 'about', 'contact']
          const scrollPosition = currentScrollY + 100

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

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, lastScrollY])

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
        setActiveSection('')
      }
    }
  }, [pathname])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Cleanup tooltip timeout
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current)
      }
    }
  }, [])

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
        setIsMobileMenuOpen(false)
        setIsOpen(false)
      }
    } else {
      window.location.href = `/#${id}`
      setIsMobileMenuOpen(false)
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
      setIsMobileMenuOpen(false)
      setIsOpen(false)
    }
  }

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `tel:${PHONE_NUMBER}`
  }

  const handleTooltipOpen = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }
    setShowTooltip(true)
  }

  const handleTooltipClose = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 300)
  }

  const navLinks = [
    { name: 'Home', href: '/', id: 'hero' },
    { name: 'Properties', href: isHomePage ? '#properties' : '/#properties', id: 'properties' },
    { name: 'Blog', href: isHomePage ? '#blog' : '/#blog', id: 'blog' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Contact Us', href: '/contact', id: 'contact' },
  ]

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (isHomePage) {
      return activeSection === link.id || (link.id === 'hero' && (activeSection === 'hero' || activeSection === ''))
    }

    if (link.id === 'blog') {
      return false
    }

    if (link.href && link.href.startsWith('/')) {
      return pathname === link.href
    }

    return false
  }

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled 
            ? 'mx-4 sm:mx-6 lg:mx-auto mt-3 sm:mt-4 max-w-6xl rounded-3xl backdrop-blur-xl bg-[#f8f5f0]/85 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/30'
            : 'bg-transparent'
        }`}>
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            isScrolled 
              ? 'px-5 sm:px-7 h-[72px] sm:h-[80px]'
              : 'px-5 sm:px-8 h-[76px] sm:h-[84px] lg:h-[88px]'
          }`}>
            <div className="flex justify-between items-center h-full">
              {/* Logo - Left */}
              <Link 
                href="/" 
                className="flex items-center shrink-0 cursor-pointer group"
                onClick={handleHomeClick}
              >
                <div className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  isScrolled
                    ? 'w-[100px] sm:w-[130px] lg:w-[150px] h-8 sm:h-10 lg:h-[44px]'
                    : 'w-[120px] sm:w-[160px] lg:w-[185px] h-10 sm:h-12 lg:h-[52px]'
                }`}>
                  <Image
                    src="/logo.png"
                    alt="Vistaar Estate"
                    fill
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 130px, 150px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Navigation - Right Aligned with Luxury Spacing */}
              <div className="hidden lg:flex items-center gap-8 xl:gap-10 ml-auto">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link)

                  if (link.name === 'Home') {
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={handleHomeClick}
                        className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                          isScrolled
                            ? 'text-[#2d2d44] hover:text-[#d4af37]'
                            : 'text-[#1a1a2e] hover:text-[#d4af37]'
                        }`}
                      >
                        <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                        <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                          isActive 
                            ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                            : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                        }`} />
                      </Link>
                    )
                  }
                  
                  if (link.href.startsWith('/') && !link.href.startsWith('#')) {
                    if (link.id === 'blog') {
                      return isHomePage ? (
                        <button
                          key={link.name}
                          onClick={() => scrollToSection(link.id)}
                          className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                            isScrolled
                              ? 'text-[#2d2d44] hover:text-[#d4af37]'
                              : 'text-[#1a1a2e] hover:text-[#d4af37]'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                          <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            isActive 
                              ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                              : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                          }`} />
                        </button>
                      ) : (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                            isScrolled
                              ? 'text-[#2d2d44] hover:text-[#d4af37]'
                              : 'text-[#1a1a2e] hover:text-[#d4af37]'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                          <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            isActive 
                              ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                              : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                          }`} />
                        </Link>
                      )
                    }

                    if (link.id === 'about' || link.id === 'contact') {
                      return isHomePage ? (
                        <button
                          key={link.name}
                          onClick={() => scrollToSection(link.id)}
                          className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                            isScrolled
                              ? 'text-[#2d2d44] hover:text-[#d4af37]'
                              : 'text-[#1a1a2e] hover:text-[#d4af37]'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                          <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            isActive 
                              ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                              : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                          }`} />
                        </button>
                      ) : (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                            isScrolled
                              ? 'text-[#2d2d44] hover:text-[#d4af37]'
                              : 'text-[#1a1a2e] hover:text-[#d4af37]'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                          <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                            isActive 
                              ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                              : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                          }`} />
                        </Link>
                      )
                    }

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                          isScrolled
                            ? 'text-[#2d2d44] hover:text-[#d4af37]'
                            : 'text-[#1a1a2e] hover:text-[#d4af37]'
                        }`}
                      >
                        <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                        <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                          isActive 
                            ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                            : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                        }`} />
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.id)}
                      className={`group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                        isScrolled
                          ? 'text-[#2d2d44] hover:text-[#d4af37]'
                          : 'text-[#1a1a2e] hover:text-[#d4af37]'
                      }`}
                    >
                      <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                      <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        isActive 
                          ? 'w-[calc(100%-4px)] -translate-x-1/2' 
                          : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
                      }`} />
                    </button>
                  )
                })}
              </div>

              {/* Call Button - Far Right */}
              <div className="hidden lg:block flex-shrink-0 ml-4">
                <div className="relative">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={handlePhoneCall}
                    onMouseEnter={handleTooltipOpen}
                    onMouseLeave={handleTooltipClose}
                    className={`group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[14px] font-medium tracking-[0.02em] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer overflow-hidden ${
                      isScrolled
                        ? 'shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)]'
                        : 'shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.4)]'
                    } hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95`}
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)'
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] via-[#d4af37] to-[#b8942a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center gap-2.5 text-white">
                      <Phone size={16} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <span>Call Now</span>
                    </span>
                  </a>

                  {/* Premium Tooltip */}
                  <div 
                    className={`absolute top-full right-0 mt-2.5 px-4 py-2.5 bg-[#1a1a2e] text-white text-xs rounded-xl shadow-2xl whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      showTooltip 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="text-[#d4af37]" />
                      <span className="font-mono tracking-wider text-sm font-medium">{DISPLAY_PHONE}</span>
                    </div>
                    <div className="absolute -top-1 right-6 w-2.5 h-2.5 bg-[#1a1a2e] rotate-45" />
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Controls */}
              <div className="flex items-center gap-2 lg:hidden">
                {/* Premium Call Button with Breathing Animation */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={handlePhoneCall}
                  className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95 group call-button ${
                    isScrolled
                      ? 'shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)]'
                      : 'shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)]'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)',
                  }}
                >
                  {/* Pulse ring animation */}
                  <span className="absolute inset-0 rounded-full animate-ping-slow opacity-40" 
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)',
                    }}
                  />
                  <span className="absolute inset-[-2px] rounded-full animate-pulse-ring opacity-30"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)',
                    }}
                  />
                  <Phone size={isScrolled ? 16 : 18} className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </a>

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 hover:bg-[#f8f5f0]/50 active:scale-95 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className={`block h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
                      isScrolled ? 'w-4' : 'w-5'
                    } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
                      isScrolled ? 'w-3' : 'w-5'
                    } ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
                      isScrolled ? 'w-4' : 'w-5'
                    } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Mobile Dropdown Menu */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isMobileMenuOpen 
                ? 'max-h-[600px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 pb-5 pt-3 bg-[#f8f5f0]/95 backdrop-blur-2xl rounded-b-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border-t border-[#d4af37]/10">
              {navLinks.map((link, index) => {
                const isActive = isLinkActive(link)
                const delay = index * 80

                if (link.name === 'Home') {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleHomeClick(e)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer rounded-xl hover:pl-6 ${
                        isActive
                          ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                          : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                      }`}
                      style={{
                        transitionDelay: `${delay}ms`,
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                      }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <>
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                          <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                        </>
                      )}
                    </Link>
                  )
                }
                
                if (link.href.startsWith('/') && !link.href.startsWith('#')) {
                  if (link.id === 'blog') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left cursor-pointer rounded-xl w-full hover:pl-6 ${
                          isActive
                            ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                            : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                        }`}
                        style={{
                          transitionDelay: `${delay}ms`,
                          opacity: isMobileMenuOpen ? 1 : 0,
                          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                        }}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && (
                          <>
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer rounded-xl hover:pl-6 ${
                          isActive
                            ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                            : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                        }`}
                        style={{
                          transitionDelay: `${delay}ms`,
                          opacity: isMobileMenuOpen ? 1 : 0,
                          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                        }}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && (
                          <>
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                          </>
                        )}
                      </Link>
                    )
                  }

                  if (link.id === 'about' || link.id === 'contact') {
                    return isHomePage ? (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left cursor-pointer rounded-xl w-full hover:pl-6 ${
                          isActive
                            ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                            : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                        }`}
                        style={{
                          transitionDelay: `${delay}ms`,
                          opacity: isMobileMenuOpen ? 1 : 0,
                          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                        }}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && (
                          <>
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer rounded-xl hover:pl-6 ${
                          isActive
                            ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                            : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                        }`}
                        style={{
                          transitionDelay: `${delay}ms`,
                          opacity: isMobileMenuOpen ? 1 : 0,
                          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                        }}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && (
                          <>
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                          </>
                        )}
                      </Link>
                    )
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer rounded-xl hover:pl-6 ${
                        isActive
                          ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                          : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                      }`}
                      style={{
                        transitionDelay: `${delay}ms`,
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                      }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <>
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                          <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                        </>
                      )}
                    </Link>
                  )
                }
                
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      scrollToSection(link.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`group relative flex items-center px-4 py-3.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left cursor-pointer rounded-xl w-full hover:pl-6 ${
                      isActive
                        ? 'text-[#d4af37] bg-gradient-to-r from-[#d4af37]/10 to-transparent'
                        : 'text-[#1a1a2e] hover:text-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37]/5 hover:to-transparent'
                    }`}
                    style={{
                      transitionDelay: `${delay}ms`,
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                        <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-r-full" />
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isScrolled ? 'h-[72px] sm:h-[80px]' : 'h-[76px] sm:h-[84px] lg:h-[88px]'
      }`} />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.15;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2.5s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .call-button {
          transform-origin: center;
        }
      `}</style>
    </>
  )
}

export default Navbar