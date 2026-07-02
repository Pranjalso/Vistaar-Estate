'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: '/img1.png',
    },
    {
      id: 2,
      image: '/img2.png',
    },
    {
      id: 3,
      image: '/img1.png',
    },
    {
      id: 4,
      image: '/img2.png',
    },
    {
      id: 5,
      image: '/img1.png',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f5efe6]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full">
            <img 
              src={slide.image} 
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Stunning Design */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Previous slide"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#d4af37] to-[#b8942a] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-300 scale-110 group-hover:scale-125" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Next slide"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#d4af37] to-[#b8942a] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-300 scale-110 group-hover:scale-125" />
        </div>
      </button>

      {/* Slide counter - Elegant */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20">
        <div className="bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
          <span className="text-2xl font-light text-white tracking-wider">
            <span className="text-[#d4af37] font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/30 mx-2">/</span>
            <span className="text-white/50">{String(slides.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Gold decorative line - top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent z-10" />

      {/* Gold decorative line - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent z-10" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5 z-10">
        <div 
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a] transition-all duration-1000 ease-in-out shadow-lg shadow-[#d4af37]/30"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default HeroSlider