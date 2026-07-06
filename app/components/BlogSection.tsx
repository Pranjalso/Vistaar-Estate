'use client'

import { Calendar, User, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useInView } from '../hooks/useInView'
import { blogPosts } from '@/lib/blogData'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const BlogSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.15, once: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    duration: 30,
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    inViewThreshold: 0.3,
    breakpoints: {
      '(min-width: 640px)': { align: 'start' },
      '(min-width: 1024px)': { align: 'start' },
    },
  })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Get all posts
  const allPosts = useMemo(() => blogPosts, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const headingContainerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: 'easeOut' as const,
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: 'easeOut' as const,
      },
    },
  }

  const controlsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  // Embla carousel setup
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onPointerDown = useCallback(() => {
    setIsDragging(true)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return
    
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('pointerDown', onPointerDown)
    emblaApi.on('pointerUp', onPointerUp)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
      emblaApi.off('pointerDown', onPointerDown)
      emblaApi.off('pointerUp', onPointerUp)
    }
  }, [emblaApi, onSelect, onPointerDown, onPointerUp])

  // Autoplay
  useEffect(() => {
    if (!emblaApi || allPosts.length === 0) return

    const startAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
      
      autoplayRef.current = setInterval(() => {
        if (!isHovering && !isDragging && !prevBtnDisabled) {
          emblaApi.scrollNext()
        }
      }, 5000)
    }

    startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [emblaApi, isHovering, isDragging, prevBtnDisabled, allPosts.length])

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }
      resizeTimerRef.current = setTimeout(() => {
        if (emblaApi) {
          emblaApi.reInit()
        }
      }, 250)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }
    }
  }, [emblaApi])

  // Pause on hover
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Handle dot click
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
  }, [emblaApi])

  // Get slide sizes based on breakpoints
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 'min-w-[280px]'
    const width = window.innerWidth
    if (width < 480) return 'min-w-[280px] sm:min-w-[300px]'
    if (width < 640) return 'min-w-[300px]'
    if (width < 768) return 'min-w-[280px] md:min-w-[300px]'
    if (width < 1024) return 'min-w-[280px] lg:min-w-[300px]'
    if (width < 1280) return 'min-w-[300px] xl:min-w-[320px]'
    return 'min-w-[320px]'
  }

  return (
    <section 
      ref={ref} 
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-[#FAF8F3] relative overflow-hidden" 
      id="blog"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#d4af37]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10 xl:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Side - Heading */}
          <motion.div 
            className="max-w-2xl lg:max-w-3xl text-center lg:text-left"
            variants={headingContainerVariants}
          >
            {/* Main Heading */}
            <motion.h2 
              variants={headingContainerVariants}
              className="text-3xl font-serif font-light text-[#1a1a2e] leading-[1.15] sm:leading-[1.1]"
            >
              Insights & <br className="hidden xs:block" />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#d4af37] via-[#c9a84c] to-[#b8942a] bg-clip-text text-transparent font-medium">
                  Stories
                </span>
                <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-12 sm:w-16 md:w-20 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent rounded-full" />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={subtitleVariants}
              className="hidden sm:block text-gray-500 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-[560px] mt-2 sm:mt-3 md:mt-4"
            >
              Discover curated perspectives, market insights, and stories from 
              the world's most exceptional properties.
            </motion.p>
          </motion.div>

          {/* Right Side - Navigation Controls */}
          <motion.div 
            variants={controlsVariants}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto"
          >
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={`group relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-[#d4af37]/20 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all duration-300 flex items-center justify-center ${
                !prevBtnDisabled 
                  ? 'opacity-100 hover:scale-110 hover:-translate-y-0.5 hover:bg-white hover:border-[#d4af37]/40 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 ${
                prevBtnDisabled ? 'opacity-30' : ''
              }`} />
              {!prevBtnDisabled && (
                <span className="absolute inset-0 rounded-full bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>

            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`group relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-[#d4af37]/20 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all duration-300 flex items-center justify-center ${
                !nextBtnDisabled 
                  ? 'opacity-100 hover:scale-110 hover:-translate-y-0.5 hover:bg-white hover:border-[#d4af37]/40 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 ${
                nextBtnDisabled ? 'opacity-30' : ''
              }`} />
              {!nextBtnDisabled && (
                <span className="absolute inset-0 rounded-full bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Embla Carousel */}
        <div className="relative">
          {/* Gradient Fades - Only show on desktop with multiple slides */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 xs:w-10 sm:w-12 md:w-16 bg-gradient-to-r from-[#FAF8F3] to-transparent pointer-events-none z-10" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 xs:w-10 sm:w-12 md:w-16 bg-gradient-to-l from-[#FAF8F3] to-transparent pointer-events-none z-10" />

          {/* Embla Viewport */}
          <div 
            className="overflow-hidden touch-pan-y" 
            ref={emblaRef}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <div className="flex gap-4 sm:gap-5 lg:gap-6 xl:gap-7">
              {allPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex-shrink-0 flex-grow-0 w-[280px] sm:w-[300px] md:w-[280px] lg:w-[300px] xl:w-[320px] ${index === 0 ? 'ml-4 sm:ml-6 lg:ml-8' : ''} ${index === allPosts.length - 1 ? 'mr-4 sm:mr-6 lg:mr-8' : ''}`}
                >
                  <article className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-2.5 border border-white/50 hover:border-[#d4af37]/10 h-full flex flex-col">
                    <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
                      {/* Image Container - Fixed 16:10 aspect ratio */}
                      <div className="relative overflow-hidden bg-gray-100 flex-shrink-0 aspect-[16/10]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 480px) 280px, (max-width: 640px) 300px, (max-width: 768px) 280px, (max-width: 1024px) 300px, (max-width: 1280px) 320px, 320px"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                          priority={index < 3}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAAAAAAAAAAAAAAAA/9k="
                        />
                        
                        {/* Category Badge - Glassmorphism */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm text-[#d4af37] text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.08em] sm:tracking-[0.1em] rounded-full shadow-lg border border-white/20">
                            {post.category}
                          </span>
                        </div>

                        {/* Read Time - Appears on Hover */}
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
                          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm text-[#1a1a2e] text-[8px] sm:text-[9px] md:text-[10px] font-medium rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                            <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#d4af37]" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>

                      {/* Content */}
                      <div className="p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                        {/* Metadata */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] xs:text-[9px] sm:text-[10px] text-gray-400 mb-1.5 sm:mb-2">
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37]" />
                            {post.date}
                          </span>
                          <span className="w-px h-2 sm:h-2.5 bg-gray-200 flex-shrink-0" />
                          <span className="flex items-center gap-1 truncate min-w-0">
                            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37] flex-shrink-0" />
                            <span className="truncate">{post.author}</span>
                          </span>
                        </div>

                        {/* Title - Serif font */}
                        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-medium text-[#1a1a2e] mb-1 sm:mb-1.5 group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h3>

                        {/* Excerpt - 2 lines */}
                        <p className="text-gray-500 text-[10px] xs:text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="pt-1.5 sm:pt-2 border-t border-gray-100/50 mt-auto">
                          <span className="group/link inline-flex items-center gap-1 sm:gap-1.5 text-[10px] xs:text-[11px] sm:text-xs font-medium text-[#1a1a2e] hover:text-[#d4af37] transition-colors duration-300">
                            <span className="relative">
                              Read Article
                              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] sm:h-[1.5px] bg-[#d4af37] group-hover/link:w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                            </span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover/link:translate-x-1 group-hover/link:scale-110 transition-all duration-300" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 lg:mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full ${
                  index === selectedIndex 
                    ? 'w-8 sm:w-10 h-2 bg-[#d4af37] shadow-[0_2px_8px_rgba(212,175,55,0.3)]' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 lg:w-[120px] h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent pointer-events-none" />
      </div>

      {/* Global styles for smooth scrolling */}
      <style jsx global>{`
        .embla__viewport {
          overflow: hidden;
          touch-action: pan-y pinch-zoom;
        }
        .embla__container {
          display: flex;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .embla__slide {
          flex: 0 0 auto;
          min-width: 0;
          -webkit-tap-highlight-color: transparent;
        }
        @media (max-width: 640px) {
          .embla__slide {
            flex: 0 0 85%;
            padding: 0 8px;
          }
        }
      `}</style>
    </section>
  )
}

export default BlogSection
