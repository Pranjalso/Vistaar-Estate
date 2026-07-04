'use client'

import { Calendar, User, ArrowLeft, Clock, Share2, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { getPostBySlug, getRelatedPosts } from '@/lib/blogData'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const post = getPostBySlug(slug)
  const relatedPosts = getRelatedPosts(slug)
  const [copied, setCopied] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.03])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -20])

  if (!post) {
    notFound()
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      carousel.scrollLeft += e.deltaY * 0.8
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel
      setShowLeftArrow(scrollLeft > 20)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20)
    }

    carousel.addEventListener('wheel', handleWheel, { passive: false })
    carousel.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      carousel.removeEventListener('wheel', handleWheel)
      carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollCarousel = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cardWidth = carousel.querySelector('article')?.getBoundingClientRect().width || 280
    const gap = 20
    const scrollAmount = (cardWidth + gap) * (window.innerWidth < 768 ? 1 : 2)
    
    carousel.scrollTo({
      left: carousel.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    })
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getShortContent = (html: string) => {
    const paragraphs = html.split('</p>')
    let shortHtml = ''
    let count = 0
    
    for (const para of paragraphs) {
      if (count < 3 && para.trim()) {
        shortHtml += para + '</p>'
        count++
      } else {
        break
      }
    }
    
    if (!shortHtml) {
      return html.substring(0, 300) + '...'
    }
    
    return shortHtml
  }

  const shortContent = getShortContent(post.content)
  const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut' as const,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  const metaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: 'easeOut' as const,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for all browsers */
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Prose styles */
        .prose h2 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1a1a2e;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .prose h3 {
          font-size: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
          font-weight: 500;
        }
        .prose p {
          margin-bottom: 0.75rem;
          color: #4a4a5a;
          font-size: 1rem;
          line-height: 1.9;
        }
        .prose ul {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.3rem;
          color: #4a4a5a;
          font-size: 1rem;
          line-height: 1.7;
        }
        .prose strong {
          color: #1a1a2e;
          font-weight: 600;
        }
        .prose blockquote {
          border-left: 3px solid #d4af37;
          background: rgba(212, 175, 55, 0.05);
          padding: 0.75rem 1.5rem;
          border-radius: 0 0.75rem 0.75rem 0;
          margin: 1rem 0;
          font-style: italic;
          color: #1a1a2e;
          font-size: 1rem;
        }
        .prose blockquote p {
          margin-bottom: 0;
          color: #1a1a2e;
        }
        .prose a {
          color: #d4af37;
          text-decoration: none;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }
        .prose a:hover {
          color: #b8942a;
          border-bottom-color: #b8942a;
        }

        @media (min-width: 640px) {
          .prose h2 {
            font-size: 1.75rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .prose h3 {
            font-size: 1.4rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .prose p {
            font-size: 1.05rem;
            margin-bottom: 1rem;
          }
          .prose li {
            font-size: 1.05rem;
          }
          .prose blockquote {
            font-size: 1.05rem;
            padding: 1rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .prose p {
            font-size: 1.1rem;
            margin-bottom: 1.25rem;
          }
          .prose li {
            font-size: 1.1rem;
          }
          .prose blockquote {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <main className="pt-20 pb-16 bg-[#f8f5f0] min-h-screen relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#d4af37]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#b8942a] transition-colors duration-300 text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Journal
            </Link>
          </motion.div>

          {/* Compact Hero Section */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-lg mb-10"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <div className="relative h-[40vh] sm:h-[50vh] lg:h-[55vh] bg-[#1a1a2e]">
              <motion.img
                src={post.image || fallbackImage}
                alt={post.title}
                className="w-full h-full object-cover"
                style={{ scale, y }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = fallbackImage
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Minimal Metadata - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.div variants={metaVariants} className="flex flex-wrap items-center gap-3 text-white/80 text-xs sm:text-sm mb-3">
                  <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                </motion.div>

                <motion.h1 
                  variants={titleVariants}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-[1.15] max-w-3xl"
                >
                  {post.title.split(' ').map((word, i) => {
                    if (word.toLowerCase() === 'luxury' || word.toLowerCase() === 'exclusive' || word.toLowerCase() === 'premium') {
                      return (
                        <span key={i} className="bg-gradient-to-r from-[#d4af37] via-[#c9a84c] to-[#b8942a] bg-clip-text text-transparent font-medium">
                          {word}{' '}
                        </span>
                      )
                    }
                    return word + ' '
                  })}
                </motion.h1>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Author & Share - Minimal */}
            <motion.div 
              variants={contentVariants}
              className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942a] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#d4af37]/20 flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-serif font-medium text-[#1a1a2e] text-sm">{post.author}</p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[#d4af37] hover:bg-[#d4af37]/10 rounded-full transition-all duration-300 text-xs font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              {copied && (
                <span className="text-[10px] text-[#d4af37] font-medium ml-2">
                  Copied!
                </span>
              )}
            </motion.div>

            {/* Article Body */}
            <div 
              ref={contentRef}
              className="prose prose-base sm:prose-lg max-w-none"
            >
              <div dangerouslySetInnerHTML={{ __html: shortContent }} />
            </div>

          </motion.div>

          {/* Related Articles - Premium Editorial Carousel */}
          {relatedPosts.length > 0 && (
            <motion.div 
              className="mt-20"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              {/* Section Header */}
              <motion.div variants={headingVariants} className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-light text-[#1a1a2e]">
                    Related Articles
                  </h2>
                  <div className="w-12 h-0.5 bg-[#d4af37] mt-1.5" />
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className={`group w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                      showLeftArrow 
                        ? 'opacity-100 hover:scale-110 hover:border-[#d4af37]/40' 
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    disabled={!showLeftArrow}
                  >
                    <ChevronLeft className={`w-4 h-4 text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 ${
                      !showLeftArrow ? 'opacity-30' : ''
                    }`} />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className={`group w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                      showRightArrow 
                        ? 'opacity-100 hover:scale-110 hover:border-[#d4af37]/40' 
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    disabled={!showRightArrow}
                  >
                    <ChevronRight className={`w-4 h-4 text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 ${
                      !showRightArrow ? 'opacity-30' : ''
                    }`} />
                  </button>
                </div>
              </motion.div>

              {/* Carousel Container */}
              <div className="relative">
                {/* Left Gradient Fade */}
                <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f8f5f0] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
                  showLeftArrow ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Right Gradient Fade */}
                <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f8f5f0] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
                  showRightArrow ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Carousel */}
                <div 
                  ref={carouselRef}
                  className="hide-scrollbar flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
                  style={{
                    scrollSnapType: 'x mandatory',
                  }}
                >
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.article
                      key={relatedPost.id}
                      variants={cardVariants}
                      className="group flex-shrink-0 w-[220px] sm:w-[240px] lg:w-[260px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 border border-white/50 hover:border-[#d4af37]/10 scroll-snap-align-start"
                      style={{
                        scrollSnapAlign: 'start',
                      }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                    >
                      <Link href={`/blog/${relatedPost.slug}`} className="block">
                        <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden bg-gray-100 rounded-t-2xl">
                          <img
                            src={relatedPost.image || fallbackImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = fallbackImage
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1.5">
                            <Calendar className="w-3 h-3 text-[#d4af37]" />
                            {relatedPost.date}
                          </div>
                          <h4 className="text-sm font-serif font-medium text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-2 leading-snug">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1.5 line-clamp-1">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 p-3 bg-white text-[#1a1a2e] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}