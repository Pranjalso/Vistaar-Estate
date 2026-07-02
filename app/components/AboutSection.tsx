'use client'

import { Award, Shield, Crown, TrendingUp, Heart, ArrowRight, CheckCircle, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const AboutSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const features = [
    { icon: Shield, text: 'Trust & Transparency' },
    { icon: Crown, text: 'Uncompromising Quality' },
    { icon: TrendingUp, text: 'Innovation & Growth' },
    { icon: Heart, text: 'Client-Centric Approach' }
  ]

  return (
    <section className="section-padding bg-[#f5efe6] overflow-hidden" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image with Animations */}
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#d4af37]/20 to-[#b8942a]/10 overflow-hidden">
                {/* Real Estate Image - Using img tag instead of next/image */}
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                  alt="Luxury Real Estate Property"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                    isImageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {/* Image Loading Skeleton */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-[#b8942a]/5 animate-pulse">
                    <div className="flex items-center justify-center h-full">
                      <Building2 className="w-16 h-16 text-[#d4af37]/30 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Gold Accent Border */}
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Animated Floating Badge - Top Right */}
            <div className="absolute -top-4 -right-4 lg:top-6 lg:right-6 bg-[#d4af37] text-white px-4 py-2 rounded-lg shadow-xl rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 z-10 animate-float-badge">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 animate-pulse" />
                <span className="font-semibold text-sm">10+ Years</span>
              </div>
            </div>

            {/* Animated Floating Badge - Bottom Left */}
            <div className="absolute -bottom-4 -left-4 lg:bottom-6 lg:left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl -rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 z-10 animate-float-badge-delayed">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#d4af37] animate-bounce" />
                <span className="font-semibold text-sm text-[#1a1a2e]">500+ Clients</span>
              </div>
            </div>

            {/* Decorative Animated Elements */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 border-4 border-[#d4af37]/20 rounded-full animate-spin-slow" />
            <div className="absolute -z-10 -top-8 -left-8 w-24 h-24 border-4 border-[#d4af37]/10 rounded-full animate-spin-slow-reverse" />
            
            {/* Pulsing Ring */}
            <div className="absolute -inset-4 rounded-2xl border-2 border-[#d4af37]/10 animate-pulse-ring" />
          </div>

          {/* Right Side - Content with Animations */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Badge */}
            <span className="inline-block px-4 py-1 bg-[#d4af37]/10 text-[#d4af37] text-sm uppercase tracking-widest rounded-full animate-fade-in">
              About Vistaar Estate
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-[#1a1a2e] leading-tight animate-fade-in-up delay-100">
              Crafting Luxury Living <br />
              <span className="text-[#d4af37] relative inline-block">
                Since 2013
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#d4af37]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-3 text-[#2d2d44] animate-fade-in-up delay-200">
              <p className="leading-relaxed">
                VISTAAR ESTATE is synonymous with premium real estate, offering exclusive plots, 
                farms, and flats that redefine luxury living.
              </p>
              <p className="leading-relaxed">
                We transform visions into reality with unmatched elegance and precision, 
                creating living spaces that are not just homes, but reflections of aspirations.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 animate-fade-in-up delay-300">
              {features.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 group cursor-pointer transform transition-all duration-300 hover:translate-x-1"
                >
                  <div className="p-1.5 rounded-full bg-[#d4af37]/10 group-hover:bg-[#d4af37]/20 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="w-4 h-4 text-[#d4af37] transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <span className="text-sm text-[#1a1a2e] font-medium transition-colors duration-300 group-hover:text-[#d4af37]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-400">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d4af37] text-white rounded-full hover:bg-[#b8942a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-medium group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1a1a2e] rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-medium border border-[#d4af37]/20 group"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-2 animate-fade-in-up delay-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942a] border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-lg transform transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[#2d2d44]">
                  <span className="font-bold text-[#1a1a2e]">500+</span> happy clients
                </span>
              </div>
              <div className="w-px h-8 bg-[#d4af37]/20" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg 
                    key={i} 
                    className="w-4 h-4 text-[#d4af37] fill-[#d4af37] animate-pulse" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-[#2d2d44] ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float-badge {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes float-badge-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.05); opacity: 0; }
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-float-badge {
            animation: float-badge 3s ease-in-out infinite;
          }
          
          .animate-float-badge-delayed {
            animation: float-badge-delayed 3.5s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 25s linear infinite;
          }
          
          .animate-pulse-ring {
            animation: pulse-ring 3s ease-out infinite;
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
          .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
          .animate-fade-in-up.delay-300 { animation-delay: 0.3s; }
          .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
          .animate-fade-in-up.delay-500 { animation-delay: 0.5s; }
        `}
      </style>
    </section>
  )
}

export default AboutSection