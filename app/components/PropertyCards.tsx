'use client'

import { 
  MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles, X, 
  Phone, Mail, ChevronLeft, ChevronRight, 
  Shield, ChevronDown, CheckCircle, 
  Car, Search, Calendar, Users, Home, 
  Building, Award, Eye, Waves, Lock, 
  Trees, Users2, Wifi, Coffee, Maximize2
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import EnquiryModal from './EnquiryModal'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PropertyCards = () => {
  const [searchConfig, setSearchConfig] = useState('')
  const [searchPrice, setSearchPrice] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [visibleCards, setVisibleCards] = useState(3)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProperty, setEnquiryProperty] = useState<string>('')
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  const PHONE_NUMBER = '+919999999999'

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`
  }

  // Body scroll lock for modal
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedProperty])

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProperty) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentImageIndex(prev => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentImageIndex(prev => (prev + 1) % selectedProperty.images.length)
      } else if (e.key === 'Escape') {
        setSelectedProperty(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProperty])

  const properties = [
    {
      id: 1,
      title: 'The Grand Vista Residences',
      location: 'Sholinganallur, Chennai',
      price: '₹2.50 Cr - ₹5.80 Cr',
      priceMin: 250,
      priceMax: 580,
      description: 'A masterpiece of contemporary architecture with panoramic views of the city skyline. Designed by world-renowned architects, this residence offers unparalleled luxury and sophistication.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      ],
      bedrooms: 4,
      bathrooms: 5,
      sqft: '4,200',
      parking: 4,
      completion: '2025',
      status: 'New Launch',
      badge: 'Premium',
      builder: 'Vistaar Estates',
      availableConfigs: ['3', '4', '5'],
      amenities: ['Infinity Pool', 'Private Garden', 'City View', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Spa', 'Tennis Court', 'Clubhouse', 'Gym'],
      premiumAmenities: ['Pool', 'Security', 'Garden', 'Clubhouse'],
    },
    {
      id: 2,
      title: 'Skyline Elite Towers',
      location: 'Kanakapura, Bengaluru',
      price: '₹3.80 Cr - ₹7.20 Cr',
      priceMin: 380,
      priceMax: 720,
      description: 'An alpine retreat redefined with brutalist elegance and unparalleled panoramic views. Experience the pinnacle of modern living in this architectural marvel.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      bedrooms: 5,
      bathrooms: 6,
      sqft: '5,800',
      parking: 3,
      completion: '2025',
      status: 'Ready to Move',
      badge: 'Luxury',
      builder: 'Vistaar Estates',
      availableConfigs: ['4', '5'],
      amenities: ['Private Spa', 'Wine Cellar', 'Private Cinema', 'Concierge', 'Valet Parking', 'Security', 'Yoga Studio', 'Cafe', 'Infinity Pool', 'Clubhouse'],
      premiumAmenities: ['Pool', 'Security', 'Cafe', 'Clubhouse'],
    },
    {
      id: 3,
      title: 'Royal Crest Villas',
      location: 'ECR, Chennai',
      price: '₹4.50 Cr - ₹8.90 Cr',
      priceMin: 450,
      priceMax: 890,
      description: 'A historic estate seamlessly blended with modern pavilions, set amidst private woodland. Where heritage meets contemporary luxury in perfect harmony.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      bedrooms: 6,
      bathrooms: 7,
      sqft: '8,500',
      parking: 6,
      completion: '2024',
      status: 'Limited Units',
      badge: 'Exclusive',
      builder: 'Vistaar Estates',
      availableConfigs: ['4', '5', '6'],
      amenities: ['Private Pool', 'Private Garden', 'Beach Access', 'Spa', 'Tennis Court', 'Butler Service', 'Smart Home', 'Security', 'Clubhouse', 'Gym'],
      premiumAmenities: ['Pool', 'Security', 'Garden', 'Beach'],
    },
    {
      id: 4,
      title: 'Emerald Heights',
      location: 'Whitefield, Bengaluru',
      price: '₹2.80 Cr - ₹4.80 Cr',
      priceMin: 280,
      priceMax: 480,
      description: 'An exquisite lakeside property with private garden and breathtaking views. Designed for those who appreciate the finer things in life.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      bedrooms: 4,
      bathrooms: 4,
      sqft: '3,800',
      parking: 3,
      completion: '2024',
      status: 'Ready to Move',
      badge: 'Premium',
      builder: 'Vistaar Estates',
      availableConfigs: ['3', '4'],
      amenities: ['Private Pool', 'Private Garden', 'Lake View', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Clubhouse', 'Gym'],
      premiumAmenities: ['Pool', 'Garden', 'Clubhouse', 'Smart Home'],
    },
    {
      id: 5,
      title: 'The Penthouse Collection',
      location: 'Powai, Mumbai',
      price: '₹8.50 Cr - ₹12.50 Cr',
      priceMin: 850,
      priceMax: 1250,
      description: 'A stunning penthouse with panoramic sea views and private rooftop pool. The epitome of urban luxury living.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      bedrooms: 3,
      bathrooms: 4,
      sqft: '3,200',
      parking: 2,
      completion: '2025',
      status: 'New Launch',
      badge: 'Luxury',
      builder: 'Vistaar Estates',
      availableConfigs: ['3', '4'],
      amenities: ['Rooftop Pool', 'Concierge', 'Valet Parking', 'Smart Home', 'Private Cinema', 'Spa', 'Clubhouse', 'Gym'],
      premiumAmenities: ['Pool', 'Security', 'Clubhouse', 'Spa'],
    },
    {
      id: 6,
      title: 'Golden Horizon Apartments',
      location: 'ECR, Chennai',
      price: '₹1.90 Cr - ₹3.80 Cr',
      priceMin: 190,
      priceMax: 380,
      description: 'A Mediterranean masterpiece featuring private beach access and lush gardens. Where every day feels like a vacation.',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      bedrooms: 4,
      bathrooms: 4,
      sqft: '4,500',
      parking: 4,
      completion: '2024',
      status: 'Ready to Move',
      badge: 'Premium',
      builder: 'Vistaar Estates',
      availableConfigs: ['3', '4'],
      amenities: ['Private Beach', 'Pool', 'Garden', 'Smart Home', 'Tennis Court', 'Gym', 'Clubhouse', 'Security'],
      premiumAmenities: ['Pool', 'Security', 'Garden', 'Beach'],
    }
  ]

  const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa', 'Penthouse']
  const priceOptions = [
    { label: 'All Budgets', min: 0, max: Infinity },
    { label: 'Below ₹1 Cr', min: 0, max: 100 },
    { label: '₹1 Cr - ₹2 Cr', min: 100, max: 200 },
    { label: '₹2 Cr - ₹3 Cr', min: 200, max: 300 },
    { label: '₹3 Cr - ₹5 Cr', min: 300, max: 500 },
    { label: '₹5 Cr - ₹10 Cr', min: 500, max: 1000 },
    { label: '₹10 Cr+', min: 1000, max: Infinity }
  ]
  const locationOptions = ['All Locations', 'Sholinganallur, Chennai', 'Kanakapura, Bengaluru', 'ECR, Chennai', 'Whitefield, Bengaluru', 'Powai, Mumbai']

  const filteredProperties = properties.filter(p => {
    let matchConfig = true
    if (searchConfig) {
      const configSearch = searchConfig.replace(' BHK', '').trim()
      matchConfig = p.availableConfigs.some(config => config === configSearch)
    }
    
    let matchPrice = true
    if (searchPrice && searchPrice !== 'All Budgets') {
      const selectedPriceOption = priceOptions.find(opt => opt.label === searchPrice)
      if (selectedPriceOption) {
        const { min: filterMin, max: filterMax } = selectedPriceOption
        const { min: propMin, max: propMax } = { min: p.priceMin, max: p.priceMax }
        matchPrice = propMax >= filterMin && propMin <= filterMax
      }
    }
    
    let matchLocation = true
    if (searchLocation && searchLocation !== 'All Locations') {
      matchLocation = p.location === searchLocation
    }
    
    return matchConfig && matchPrice && matchLocation
  })

  const displayedProperties = filteredProperties.slice(0, visibleCards)
  const hasMore = visibleCards < filteredProperties.length

  const handleViewMore = () => {
    const newCount = Math.min(visibleCards + 3, filteredProperties.length)
    setVisibleCards(newCount)
  }

  const openPropertyModal = (property: any) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
  }

  const closePropertyModal = () => {
    setSelectedProperty(null)
  }

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex(prev => (prev + 1) % selectedProperty.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex(prev => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length)
    }
  }

  // Framer Motion variants
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

  const headingVariants = {
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

  const subtitleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.15,
        ease: 'easeOut' as const,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    }),
  }

  return (
    <>
      <style jsx global>{`
        .modal-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .modal-scroll::-webkit-scrollbar {
          display: none;
        }
        .no-scroll {
          overflow: hidden !important;
        }
        .description-text {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        .filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 12px;
          padding-right: 36px;
        }
        .filter-select:focus {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        }
        .amenity-chip {
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .amenity-chip:hover {
          transform: translateY(-2px);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
          border-color: #d4af37;
        }
        .amenity-chip:hover .amenity-icon {
          color: #d4af37;
        }
        .property-card {
          transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .property-card:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.1);
        }
        .property-card:hover .property-image {
          transform: scale(1.06);
        }
        .property-image {
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .view-details-btn {
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .view-details-btn:hover {
          background: #d4af37;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
        }
        .view-details-btn:hover .arrow-icon {
          transform: translateX(4px);
        }
        .arrow-icon {
          transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .price-chip {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .mobile-filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 14px;
          padding-right: 44px;
          cursor: pointer;
        }
        .mobile-filter-select:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        }
        .modal-close-btn {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .spec-card {
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .spec-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          border-color: #d4af37/30;
        }
      `}</style>

      <section ref={ref} id="properties" className="py-16 md:py-24 bg-[#FAF8F4] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a1a2e]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div 
            className="mb-10 md:mb-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={headingVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 text-[#d4af37] text-[11px] uppercase tracking-[0.3em] rounded-full mb-4 border border-[#d4af37]/20 font-medium">
                <Sparkles className="w-4 h-4" />
                Featured Properties
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1A1A1A] mb-3 leading-[1.1] max-w-4xl">
                Discover Luxury Homes
                <br />
                <span className="text-[#d4af37] font-medium">Crafted for Modern Living</span>
              </h2>
              <motion.p 
                variants={subtitleVariants}
                className="text-[#6B7280] text-base sm:text-lg font-light leading-relaxed max-w-2xl"
              >
                Discover a curated collection of the world's most prestigious residences, 
                where architectural mastery meets unparalleled elegance.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Desktop Filter Bar - Hidden on Mobile */}
          <motion.div 
            className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d4af37]/10 p-4 md:p-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                  Configuration
                </label>
                <select
                  value={searchConfig}
                  onChange={(e) => setSearchConfig(e.target.value)}
                  className="filter-select w-full px-4 py-2.5 bg-white/70 border border-[#d4af37]/10 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-[#1A1A1A] cursor-pointer"
                >
                  <option value="">All Configurations</option>
                  {configOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                  Budget
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="filter-select w-full px-4 py-2.5 bg-white/70 border border-[#d4af37]/10 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-[#1A1A1A] cursor-pointer"
                >
                  {priceOptions.map(opt => (
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                  Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="filter-select w-full px-4 py-2.5 bg-white/70 border border-[#d4af37]/10 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-[#1A1A1A] cursor-pointer"
                >
                  {locationOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchConfig('')
                    setSearchPrice('')
                    setSearchLocation('')
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  Search Properties
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filter - Clean Dropdowns Only */}
          <div className="lg:hidden mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                  Configuration
                </label>
                <select
                  value={searchConfig}
                  onChange={(e) => setSearchConfig(e.target.value)}
                  className="mobile-filter-select w-full px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all text-sm text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <option value="">Config</option>
                  {configOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                  Budget
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="mobile-filter-select w-full px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all text-sm text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  {priceOptions.map(opt => (
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">
                Location
              </label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="mobile-filter-select w-full px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all text-sm text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                {locationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {filteredProperties.length > 0 && (
            <div className="mb-5 text-sm text-[#6B7280]">
              Showing <span className="font-semibold text-[#1A1A1A]">{filteredProperties.length}</span> properties
              {searchConfig && <span className="ml-1">in <span className="font-semibold text-[#1A1A1A]">{searchConfig}</span></span>}
            </div>
          )}

          {/* Cards Grid */}
          {filteredProperties.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {displayedProperties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#d4af37]/5 property-card cursor-pointer"
                  onClick={() => openPropertyModal(property)}
                >
                  {/* Image */}
                  <div className="relative h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden bg-gray-100">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover property-image"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-[#d4af37] text-white text-[9px] font-medium uppercase tracking-[0.15em] rounded-full shadow-lg">
                        {property.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <div className="price-chip bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg border border-white/30">
                        <span className="text-[#1A1A1A] font-semibold text-xs">{property.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-serif font-medium text-[#1A1A1A] leading-tight group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[#6B7280] text-xs md:text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    <p className="text-[#6B7280] text-xs md:text-sm leading-relaxed mt-2 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-gray-100/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#6B7280]">
                          <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="text-xs font-medium text-[#1A1A1A]">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B7280]">
                          <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="text-xs font-medium text-[#1A1A1A]">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B7280]">
                          <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="text-xs font-medium text-[#1A1A1A]">{property.sqft}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B7280]">
                          <Car className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="text-xs font-medium text-[#1A1A1A]">{property.parking}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                      {property.premiumAmenities.map((amenity: string, idx: number) => {
                        const iconMap: Record<string, any> = {
                          'Pool': Waves,
                          'Security': Lock,
                          'Garden': Trees,
                          'Clubhouse': Users2,
                          'Cafe': Coffee,
                          'Spa': Sparkles,
                          'Beach': Users,
                          'Smart Home': Wifi,
                        }
                        const Icon = iconMap[amenity] || Home
                        return (
                          <span key={idx} className="amenity-chip flex items-center gap-1 px-2.5 py-1 bg-[#F8F6F2] border border-gray-100/50 rounded-full text-[10px] text-[#6B7280] cursor-default">
                            <Icon className="w-3 h-3 amenity-icon text-[#d4af37]/70" />
                            {amenity}
                          </span>
                        )
                      })}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100/50">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          openPropertyModal(property)
                        }}
                        className="view-details-btn group inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#d4af37]/30 rounded-full text-xs font-medium text-[#1A1A1A] transition-all duration-300"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">No Properties Found</h3>
              <p className="text-[#6B7280]">Try adjusting your filters to find the perfect property</p>
              <button
                onClick={() => {
                  setSearchConfig('')
                  setSearchPrice('')
                  setSearchLocation('')
                }}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full hover:shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {hasMore && filteredProperties.length > 0 && (
            <motion.div 
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={handleViewMore}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white border border-[#d4af37]/30 text-[#1A1A1A] rounded-full hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all duration-400 font-medium text-sm hover:shadow-xl hover:shadow-[#d4af37]/20"
              >
                <span>View More Properties</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Premium Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePropertyModal()
            }}
          >
            <div className="absolute inset-0 bg-[#0F0F14]/65 backdrop-blur-xl" />
            
            <motion.div 
              className="relative w-full max-w-7xl bg-white rounded-3xl lg:rounded-4xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] max-h-[95vh] lg:max-h-[92vh]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button - Glassmorphism */}
              <button
                onClick={closePropertyModal}
                className="absolute top-4 right-4 z-30 w-10 h-10 lg:w-11 lg:h-11 modal-close-btn bg-white/90 hover:bg-white text-[#1A1A1A] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg border border-white/30"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              {/* Mobile Layout */}
              <div className="flex flex-col lg:hidden max-h-[95vh]">
                <div className="relative h-[300px] sm:h-[360px] bg-gray-900 flex-shrink-0">
                  <AnimatePresence mode="wait" custom={1}>
                    <motion.div
                      key={currentImageIndex}
                      custom={1}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <img 
                        src={selectedProperty.images[currentImageIndex]} 
                        alt={selectedProperty.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-xl text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-xl text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {selectedProperty.images.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/40 w-2'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-lg px-4 py-2 rounded-xl shadow-xl border border-white/20">
                      <span className="text-[#1A1A1A] font-bold text-sm">{selectedProperty.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white modal-scroll">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-3 py-0.5 bg-[#d4af37]/10 text-[#d4af37] text-[9px] font-medium uppercase tracking-[0.15em] rounded-full border border-[#d4af37]/20">
                          {selectedProperty.badge}
                        </span>
                        <span className="px-3 py-0.5 bg-[#1A1A1A]/5 text-[#1A1A1A] text-[9px] font-medium uppercase tracking-[0.15em] rounded-full border border-gray-100">
                          {selectedProperty.status}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] leading-tight">
                        {selectedProperty.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-[#6B7280] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{selectedProperty.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { icon: Bed, label: 'Beds', value: selectedProperty.bedrooms },
                        { icon: Bath, label: 'Baths', value: selectedProperty.bathrooms },
                        { icon: Maximize2, label: 'Area', value: selectedProperty.sqft + ' sq.ft' },
                        { icon: Car, label: 'Parking', value: selectedProperty.parking },
                      ].map((item, idx) => (
                        <div key={idx} className="spec-card p-3 bg-[#FAF8F4] rounded-xl border border-gray-100/80 text-center hover:border-[#d4af37]/30">
                          <item.icon className="w-4 h-4 text-[#d4af37] mx-auto mb-1.5" />
                          <div className="text-[8px] sm:text-[9px] text-[#6B7280] uppercase tracking-wider">{item.label}</div>
                          <div className="font-semibold text-[#1A1A1A] text-xs sm:text-sm mt-0.5">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#d4af37]/5 to-[#b8942a]/5 rounded-xl p-3 sm:p-4 border border-[#d4af37]/10">
                      <p className="description-text text-[#6B7280] text-xs sm:text-sm leading-relaxed">
                        {selectedProperty.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-[#1A1A1A] mb-2 uppercase tracking-wider">Premium Amenities</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProperty.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF8F4] rounded-lg border border-gray-100/80 text-[10px] sm:text-xs text-[#6B7280]">
                            <CheckCircle className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                            <span className="whitespace-nowrap">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-gray-100">
                      <button 
                        className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:scale-[1.02]"
                        onClick={handleCall}
                      >
                        <Phone className="w-4 h-4" />
                        Book a Site Visit
                      </button>
                      <button 
                        className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2d2d2d] text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        onClick={() => {
                          setEnquiryProperty(selectedProperty.title)
                          setIsEnquiryModalOpen(true)
                        }}
                      >
                        <Mail className="w-4 h-4" />
                        Request Callback
                      </button>
                      <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B7280] pt-1">
                        <Shield className="w-3.5 h-3.5" />
                        <span>100% Verified Properties</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>RERA Registered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - 65/35 Split */}
              <div className="hidden lg:flex h-[92vh]">
                {/* Left - Image Gallery (65%) */}
                <div className="w-[65%] h-full relative bg-gray-900">
                  <AnimatePresence mode="wait" custom={1}>
                    <motion.div
                      key={currentImageIndex}
                      custom={1}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <img 
                        src={selectedProperty.images[currentImageIndex]} 
                        alt={selectedProperty.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-2xl text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-110 hover:border-white/20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-2xl text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-110 hover:border-white/20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProperty.images.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentImageIndex === idx ? 'bg-white w-8' : 'bg-white/30 w-2.5 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <div className="bg-white/95 backdrop-blur-2xl px-6 py-3 rounded-2xl shadow-2xl border border-white/20">
                      <span className="text-[#1A1A1A] font-bold text-xl">{selectedProperty.price}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-xl text-[#d4af37] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full border border-white/20 shadow-lg">
                      {selectedProperty.badge}
                    </span>
                    <span className="px-4 py-1.5 bg-black/30 backdrop-blur-xl text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full border border-white/10 shadow-lg">
                      {selectedProperty.status}
                    </span>
                  </div>
                </div>

                {/* Right - Information Panel (35%) */}
                <div className="w-[35%] h-full overflow-y-auto p-6 lg:p-8 bg-white modal-scroll">
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">
                        {selectedProperty.title}
                      </h2>
                      <div className="flex items-center gap-2 text-[#6B7280] mt-1.5">
                        <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        <span className="text-sm">{selectedProperty.location}</span>
                      </div>
                    </div>

                    {/* 2x2 Specification Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Bed, label: 'Bedrooms', value: selectedProperty.bedrooms + ' BHK' },
                        { icon: Bath, label: 'Bathrooms', value: selectedProperty.bathrooms },
                        { icon: Maximize2, label: 'Area', value: selectedProperty.sqft + ' sq.ft' },
                        { icon: Car, label: 'Parking', value: selectedProperty.parking },
                      ].map((item, idx) => (
                        <div key={idx} className="spec-card p-3 bg-[#FAF8F4] rounded-xl border border-gray-100/80 hover:border-[#d4af37]/30 transition-all duration-300">
                          <item.icon className="w-4 h-4 text-[#d4af37] mb-1.5" />
                          <div className="text-[9px] text-[#6B7280] uppercase tracking-wider">{item.label}</div>
                          <div className="font-semibold text-[#1A1A1A] text-sm mt-0.5">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Description - Premium Quote Style */}
                    <div className="bg-gradient-to-r from-[#d4af37]/5 via-[#d4af37]/3 to-transparent rounded-xl p-4 border-l-2 border-[#d4af37]/30">
                      <p className="description-text text-[#4A4A5A] text-sm leading-relaxed italic">
                        "{selectedProperty.description}"
                      </p>
                      <div className="mt-2 text-[10px] text-[#6B7280]">
                        — {selectedProperty.builder}
                      </div>
                    </div>

                    {/* Amenities - Elegant Pills */}
                    <div>
                      <h4 className="text-[10px] font-semibold text-[#1A1A1A] mb-2.5 uppercase tracking-wider">
                        Premium Amenities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.slice(0, 8).map((amenity: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F4] rounded-full border border-gray-100/80 text-[11px] text-[#4A4A5A] hover:border-[#d4af37]/30 hover:bg-white transition-all duration-300 hover:shadow-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="pt-3 border-t border-gray-100/80">
                      <div className="space-y-2.5">
                        <button 
                          className="group relative w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2 text-sm overflow-hidden"
                          onClick={handleCall}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          <Phone className="w-4 h-4" />
                          Book a Site Visit
                        </button>
                        <button 
                          className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#2d2d2d] text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:shadow-xl"
                          onClick={() => {
                            setEnquiryProperty(selectedProperty.title)
                            setIsEnquiryModalOpen(true)
                          }}
                        >
                          <Mail className="w-4 h-4" />
                          Request Callback
                        </button>
                        <div className="flex items-center justify-center gap-2.5 text-[10px] text-[#6B7280]">
                          <Shield className="w-3.5 h-3.5" />
                          <span>100% Verified Properties</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>RERA Registered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        propertyName={enquiryProperty}
      />
    </>
  )
}

export default PropertyCards