'use client'

import { Shield, Crown, Users, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'

const AboutSection = () => {
  const [isImage1Loaded, setIsImage1Loaded] = useState(false)
  const [isImage2Loaded, setIsImage2Loaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const controls = {
    leftContent: useAnimation(),
    rightContent: useAnimation(),
    images: useAnimation(),
  }

  useEffect(() => {
    if (isInView) {
      controls.leftContent.start('visible')
      controls.rightContent.start('visible')
      controls.images.start('visible')
    }
  }, [isInView, controls])

  const features = [
    { 
      icon: Shield, 
      title: 'Trusted Expertise',
      description: 'Guided by a legacy of integrity and deep-rooted knowledge in the global luxury market.'
    },
    { 
      icon: Crown, 
      title: 'Premium Properties',
      description: 'Access to an elite collection of properties that embody architectural mastery and comfort.'
    },
    { 
      icon: Users, 
      title: 'Customer-Centric Service',
      description: 'Personalized white-glove service tailored to the unique lifestyle requirements of every client.'
    },
    { 
      icon: TrendingUp, 
      title: 'Transparent Transactions',
      description: 'Honest dealings and meticulous attention to legal details for complete peace of mind.'
    }
  ]

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  }

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  }

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  }

  const staggerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  }

  const staggerItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const }
    }
  }

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: 'easeOut' as const }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 lg:py-36 bg-[#f5efe6] relative overflow-hidden" 
      id="about"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d4af37]/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#d4af37]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/[0.02] rounded-full blur-3xl" />
        
        {/* Decorative Line - Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-start">
          
          {/* Left Column */}
          <div className="space-y-10">
            {/* Heading */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={controls.leftContent}
              className="space-y-4 text-center lg:text-left"
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a1a2e] leading-[1.08]">
                Exceptional Living
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]">
                  Experiences
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              animate={controls.leftContent}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-[#2d2d44]/75 leading-relaxed max-w-lg"
            >
              Vistaar Estates represents the pinnacle of luxury real estate, where architectural heritage meets 
              contemporary elegance. We specialize in curating an exclusive portfolio of residential and commercial 
              properties that redefine the standard of excellence.
            </motion.p>

            {/* Overlapping Images */}
            <motion.div 
              variants={imageVariant}
              initial="hidden"
              animate={controls.images}
              className="relative mt-6"
            >
              <div className="relative" style={{ height: '420px' }}>
                {/* Main Image */}
                <div className="absolute left-0 top-0 w-[75%] h-[85%] rounded-2xl overflow-hidden shadow-2xl shadow-[#d4af37]/10 hover:shadow-[#d4af37]/20 transition-shadow duration-700">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                    alt="Luxury property exterior"
                    fill
                    className={`object-cover transition-all duration-1000 ${
                      isImage1Loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                    } hover:scale-105`}
                    onLoad={() => setIsImage1Loaded(true)}
                    priority
                  />
                  {!isImage1Loaded && (
                    <div className="absolute inset-0 bg-[#d4af37]/10 animate-pulse" />
                  )}
                </div>

                {/* Secondary Image */}
                <div className="absolute right-0 bottom-0 w-[60%] h-[65%] rounded-2xl overflow-hidden shadow-2xl shadow-[#d4af37]/10 border-[6px] border-[#f5efe6] hover:shadow-[#d4af37]/20 transition-shadow duration-700">
                  <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                    alt="Luxury interior"
                    fill
                    className={`object-cover transition-all duration-1000 ${
                      isImage2Loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                    } hover:scale-105`}
                    onLoad={() => setIsImage2Loaded(true)}
                  />
                  {!isImage2Loaded && (
                    <div className="absolute inset-0 bg-[#d4af37]/10 animate-pulse" />
                  )}
                </div>

                {/* Gold Accent Line */}
                <div className="absolute -bottom-3 left-0 w-20 h-0.5 bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Feature Items */}
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            animate={controls.rightContent}
            className="space-y-6 md:space-y-7 lg:space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariant}
                className="group flex gap-6 p-6 md:p-7 lg:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#d4af37]/10 hover:border-[#d4af37]/30 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-[#b8942a]/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#d4af37]/20 transition-all duration-400">
                    <feature.icon className="w-6 h-6 text-[#d4af37]" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-[#1a1a2e] mb-1.5 group-hover:text-[#d4af37] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#2d2d44]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
    </section>
  )
}

export default AboutSection
