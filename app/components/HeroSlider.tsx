'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
      alt: 'Luxury modern villa with infinity pool and ocean view',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80',
      alt: 'Elegant luxury mansion with golden hour lighting',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      alt: 'Contemporary luxury home with warm interior lighting',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      alt: 'Luxury penthouse with panoramic city skyline views',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80',
      alt: 'Modern architectural masterpiece with pool and garden',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length, isTransitioning])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-[#0f0f1a]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className={`object-cover transition-transform duration-[10000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              priority={index === 0}
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Dark gradient overlay with warm gold undertones */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/80 via-[#1a1a2e]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/90 via-transparent to-[#1a1a2e]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f1a]/80" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-[#d4af37]/5" />
          <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-overlay" />
        </div>
      ))}

      {/* Content Overlay - Added padding to prevent overlap with navigation */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-12 sm:px-16 md:px-20 lg:px-24 xl:px-32">
          <div className="max-w-3xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#d4af37]/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#f5efe6] font-light">
                Premier Luxury Estates
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl font-bold text-white leading-[1.1] mb-4 animate-fade-in-up animation-delay-100">
              <span className="block">Discover</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#e8c84a]">
                Extraordinary
              </span>
              <span className="block">Living</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#f5efe6]/80 max-w-md leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Experience unparalleled luxury in our curated collection 
              of the world's most prestigious properties.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/#properties" className="group relative px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-[#0f0f1a] font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30 overflow-hidden">
                <span className="relative z-10">Explore Properties</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    const navbarHeight = 96
                    const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - navbarHeight
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
                  }
                }}
                className="group relative px-8 py-3 bg-transparent border border-[#d4af37]/40 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/10 overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex gap-6 sm:gap-10 mt-10 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-xl sm:text-2xl text-[#d4af37] font-serif font-bold">10+</div>
                <div className="text-[10px] sm:text-xs text-[#f5efe6]/50 uppercase tracking-wider">Years Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl text-[#d4af37] font-serif font-bold">500+</div>
                <div className="text-[10px] sm:text-xs text-[#f5efe6]/50 uppercase tracking-wider">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl text-[#d4af37] font-serif font-bold">1000+</div>
                <div className="text-[10px] sm:text-xs text-[#f5efe6]/50 uppercase tracking-wider">Premium Properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Better positioned with increased spacing */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Previous slide"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] bg-white/10 backdrop-blur-xl border border-[#d4af37]/20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-[#d4af37]/60 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/20">
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/70 group-hover:text-[#d4af37] transition-colors duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 rounded-full border border-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-300 scale-110 group-hover:scale-125" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Next slide"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] bg-white/10 backdrop-blur-xl border border-[#d4af37]/20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-[#d4af37]/60 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/20">
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/70 group-hover:text-[#d4af37] transition-colors duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 rounded-full border border-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-300 scale-110 group-hover:scale-125" />
        </div>
      </button>

      {/* Slide Counter - Moved further from edge */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:right-12 lg:right-16 xl:right-20 z-20">
        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#d4af37]/20 shadow-2xl">
          <span className="font-serif text-sm sm:text-base md:text-lg font-light text-white tracking-wider">
            <span className="text-[#d4af37] font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/20 mx-1.5">/</span>
            <span className="text-white/40">{String(slides.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Gold Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent z-10" />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-10 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a] transition-all duration-[5000ms] ease-out shadow-lg shadow-[#d4af37]/20"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce-slow">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-light">Scroll to explore</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-[#d4af37]/40 rounded-full mt-1.5 animate-scroll-indicator" />
        </div>
      </div>

      {/* Floating Decorative Orbs */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

export default HeroSlider