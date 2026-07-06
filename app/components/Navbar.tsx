'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import Image from 'next/image'

const PHONE_NUMBER = '+919999999999'
const DISPLAY_PHONE = '+91 99999 99999'

// Fires the scrolled state the instant the page moves. A tiny threshold keeps
// it from toggling on sub-pixel/elastic scroll without adding any perceptible delay.
const SCROLL_THRESHOLD = 4

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const pathname = usePathname()
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const tickingRef = useRef(false)
  const scrolledRef = useRef(false)
  const activeRef = useRef('')
  const isHomePage = pathname === '/'

  // rAF-throttled scroll handler. Only commits state when it actually changes,
  // so scrolling never triggers unnecessary React re-renders.
  const readScroll = useCallback(() => {
    const y = window.scrollY

    const shouldScroll = y > SCROLL_THRESHOLD
    if (shouldScroll !== scrolledRef.current) {
      scrolledRef.current = shouldScroll
      setIsScrolled(shouldScroll)
    }

    if (isHomePage) {
      let next = 'hero'
      if (y >= 100) {
        const sections = ['properties', 'blog', 'about', 'contact']
        const scrollPosition = y + 100
        for (const section of sections) {
          const el = document.getElementById(section)
          if (el) {
            const { offsetTop, offsetHeight } = el
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              next = section
              break
            }
          }
        }
      }
      if (next !== activeRef.current) {
        activeRef.current = next
        setActiveSection(next)
      }
    }
  }, [isHomePage])

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return
    tickingRef.current = true
    requestAnimationFrame(() => {
      readScroll()
      tickingRef.current = false
    })
  }, [readScroll])

  useEffect(() => {
    // Sync immediately on mount (handles refresh mid-page) then listen passively.
    readScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, readScroll])

  // Handle hash on load
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/') {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        activeRef.current = hash
        setActiveSection(hash)
      } else if (window.scrollY < 100) {
        activeRef.current = 'hero'
        setActiveSection('hero')
      }
    }
  }, [pathname])

  // Close mobile menu on escape
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
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
    }
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      if (isHomePage) {
        const el = document.getElementById(id)
        if (el) {
          const navbarHeight = 80
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' })
          setIsMobileMenuOpen(false)
        }
      } else {
        window.location.href = `/#${id}`
        setIsMobileMenuOpen(false)
      }
    },
    [isHomePage],
  )

  const handleHomeClick = useCallback(
    (e: React.MouseEvent) => {
      if (isHomePage) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        activeRef.current = 'hero'
        setActiveSection('hero')
        setIsMobileMenuOpen(false)
      }
    },
    [isHomePage],
  )

  const handlePhoneCall = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `tel:${PHONE_NUMBER}`
  }, [])

  const handleTooltipOpen = useCallback(() => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
    setShowTooltip(true)
  }, [])

  const handleTooltipClose = useCallback(() => {
    tooltipTimeoutRef.current = setTimeout(() => setShowTooltip(false), 300)
  }, [])

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])

  const navLinks = [
    { name: 'Home', href: '/', id: 'hero' },
    { name: 'Properties', href: isHomePage ? '#properties' : '/#properties', id: 'properties' },
    { name: 'Blog', href: isHomePage ? '#blog' : '/#blog', id: 'blog' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Contact Us', href: '/contact', id: 'contact' },
  ]

  const isLinkActive = useCallback(
    (link: (typeof navLinks)[0]) => {
      if (isHomePage) {
        return (
          activeSection === link.id ||
          (link.id === 'hero' && (activeSection === 'hero' || activeSection === ''))
        )
      }
      if (link.href.startsWith('/') && !link.href.startsWith('#')) {
        return pathname === link.href
      }
      return false
    },
    [isHomePage, activeSection, pathname],
  )

  const linkBase =
    'group relative py-1 text-[14px] xl:text-[15px] font-medium tracking-[0.02em] text-[#1a1a2e] transition-colors duration-200 ease-out hover:text-[#d4af37]'

  const underline = (isActive: boolean) =>
    `absolute -bottom-1 left-1/2 h-[2px] bg-[#d4af37] rounded-full transition-[width,transform] duration-200 ease-out ${
      isActive
        ? 'w-[calc(100%-4px)] -translate-x-1/2'
        : 'w-0 group-hover:w-[calc(100%-4px)] group-hover:-translate-x-1/2'
    }`

  const renderDesktopLink = (link: (typeof navLinks)[0]) => {
    const isActive = isLinkActive(link)
    const inner = (
      <>
        <span className="relative z-10 whitespace-nowrap">{link.name}</span>
        <span className={underline(isActive)} />
      </>
    )

    if (link.name === 'Home') {
      return (
        <Link key={link.name} href={link.href} onClick={handleHomeClick} className={linkBase}>
          {inner}
        </Link>
      )
    }

    // Section links: on the homepage scroll smoothly, otherwise navigate.
    const isSectionScroll = isHomePage && ['properties', 'blog', 'about', 'contact'].includes(link.id)
    if (isSectionScroll) {
      return (
        <button key={link.name} onClick={() => scrollToSection(link.id)} className={`${linkBase} cursor-pointer`}>
          {inner}
        </button>
      )
    }

    return (
      <Link key={link.name} href={link.href} className={linkBase}>
        {inner}
      </Link>
    )
  }

  return (
    <>
      {/*
        Fixed, always-visible navbar. Height is CONSTANT (never animated) so there
        is zero cumulative layout shift. Only visual properties transition.
      */}
      <nav
        className="fixed inset-x-0 top-0 z-50 border-0 outline-none"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div
            style={{ willChange: 'background-color, box-shadow, backdrop-filter' }}
            className={`flex h-16 items-center justify-between rounded-b-2xl px-4 outline-none sm:h-[72px] sm:px-6 transition-all duration-150 ease-out ${
              isScrolled
                ? 'mt-3 rounded-2xl border border-white/30 bg-white/92 px-5 shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:px-7'
                : 'mt-0 border border-transparent bg-transparent shadow-none'
            }`}
          >
            {/* Logo - Left - Increased size on mobile/tablet */}
            <Link
              href="/"
              onClick={handleHomeClick}
              className="group flex shrink-0 items-center"
              aria-label="Vistaar Estate - Home"
            >
              <div className="relative h-11 w-[200px] sm:h-13 sm:w-[220px] md:h-13 md:w-[220px] lg:h-12 lg:w-[210px]">
                <Image
                  src="/logo.png"
                  alt="Vistaar Estate"
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 220px, 210px"
                  className="object-contain object-left transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="ml-auto hidden items-center gap-8 lg:flex xl:gap-10">
              {navLinks.map(renderDesktopLink)}
            </div>

            {/* Desktop Call Button */}
            <div className="ml-4 hidden shrink-0 lg:block">
              <div className="relative">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={handlePhoneCall}
                  onMouseEnter={handleTooltipOpen}
                  onMouseLeave={handleTooltipClose}
                  className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-[14px] font-medium tracking-[0.02em] text-white shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] via-[#d4af37] to-[#b8942a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Phone size={16} className="relative transition-transform duration-200 ease-out group-hover:rotate-12" />
                  <span className="relative">Call Now</span>
                </a>

                {/* Tooltip */}
                <div
                  className={`absolute right-0 top-full mt-2.5 whitespace-nowrap rounded-xl bg-[#1a1a2e] px-4 py-2.5 text-xs text-white shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
                    showTooltip
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                  role="tooltip"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-[#d4af37]" />
                    <span className="font-mono text-sm font-medium tracking-wider">{DISPLAY_PHONE}</span>
                  </div>
                  <div className="absolute -top-1 right-6 h-2.5 w-2.5 rotate-45 bg-[#1a1a2e]" />
                </div>
              </div>
            </div>

            {/* Mobile Controls - Golden */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={handlePhoneCall}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95 sm:h-11 sm:w-11"
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8942a 100%)' }}
                aria-label="Call us"
              >
                <Phone size={16} className="relative z-10" />
              </a>

              <button
                onClick={toggleMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ease-out hover:bg-[#f8f5f0]/60 active:scale-95 sm:h-11 sm:w-11"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <span className={`block h-0.5 w-5 bg-[#1a1a2e] transition-transform duration-200 ease-out ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-[#1a1a2e] transition-opacity duration-200 ease-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-[#1a1a2e] transition-transform duration-200 ease-out ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu - Clean, minimal, no golden background effects */}
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
              isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-2 rounded-2xl border border-[#e5e5e5] bg-white/95 px-3 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link)
                const cls = `group relative flex w-full items-center rounded-xl px-4 py-3.5 text-left text-[15px] font-medium tracking-[0.02em] transition-colors duration-200 ease-out ${
                  isActive
                    ? 'text-[#d4af37]'
                    : 'text-[#1a1a2e] hover:text-[#d4af37]'
                }`
                const marker = isActive ? (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#d4af37]" />
                ) : null

                if (link.name === 'Home') {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleHomeClick(e)
                        setIsMobileMenuOpen(false)
                      }}
                      className={cls}
                    >
                      {marker}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )
                }

                const isSectionScroll =
                  isHomePage && ['properties', 'blog', 'about', 'contact'].includes(link.id)
                if (isSectionScroll) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        scrollToSection(link.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`${cls} cursor-pointer`}
                    >
                      {marker}
                      <span className="relative z-10">{link.name}</span>
                    </button>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cls}
                  >
                    {marker}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Constant-height spacer prevents any layout shift under the fixed navbar. */}
      <div className="h-16 sm:h-[72px]" aria-hidden="true" />

      {/* CSS animations */}
      <style jsx>{`
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar