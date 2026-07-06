'use client'

import { 
  MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles, X, 
  Phone, Mail, ChevronLeft, ChevronRight, 
  Shield, ChevronDown, CheckCircle, 
  Car, Search, Calendar, Users, Home, 
  Building, Award, Eye, Waves, Lock, 
  Trees, Users2, Wifi, Coffee, Maximize2,
  Crown, Gem, Heart, Star
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
      description: 'A masterpiece of contemporary architecture with panoramic views of the city skyline.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
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
      description: 'An alpine retreat redefined with brutalist elegance and unparalleled panoramic views.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
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
      description: 'A historic estate seamlessly blended with modern pavilions, set amidst private woodland.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
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
      description: 'An exquisite lakeside property with private garden and breathtaking views.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
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
      description: 'A stunning penthouse with panoramic sea views and private rooftop pool.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
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
      description: 'A Mediterranean masterpiece featuring private beach access and lush gardens.',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
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
        duration: 0.4,
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

  return (
    <>
      <style jsx global>{`
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
        .spec-card {
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .spec-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
        /* Thumbnail images in modal */
        .thumb-img {
          transition: all 0.25s ease;
        }
        .thumb-img:hover {
          transform: scale(1.05);
        }
        /* Modal image transition */
        .modal-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease;
        }
        .modal-img:hover {
          transform: scale(1.04);
        }
        /* Landscape modal on all screens - FIXED FOR LARGE SCREENS */
        .modal-landscape {
          aspect-ratio: 16 / 9;
          max-height: 85vh;
          width: 100%;
          max-width: 1024px;
          height: auto;
          min-height: 480px;
          max-height: 560px;
        }
        @media (max-width: 1024px) {
          .modal-landscape {
            max-height: 80vh;
            min-height: 400px;
          }
        }
        @media (max-width: 640px) {
          .modal-landscape {
            aspect-ratio: 16 / 10;
            max-height: 95vh;
            min-height: 320px;
          }
        }
        /* Cursor pointer for all interactive modal elements */
        .modal-landscape button,
        .modal-landscape [role="button"] {
          cursor: pointer;
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
                        className="view-details-btn group inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#d4af37]/30 rounded-full text-xs font-medium text-[#1A1A1A] transition-all duration-300 cursor-pointer"
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

      {/* STUNNING LANDSCAPE MODAL - OPTIMIZED FOR LARGE SCREENS */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePropertyModal()
            }}
          >
            {/* Premium Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12]/92 via-[#1a1a1a]/85 to-[#0a0a12]/92 backdrop-blur-xl" onClick={closePropertyModal} />

            <motion.div
              className="modal-landscape relative bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gold Top Strip - Premium */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b8942a] via-[#e8c84a] to-[#b8942a] z-40" />

              {/* Glowing Gold Accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent blur-sm z-40" />

              {/* Close Button - Premium Glass */}
              <button
                onClick={closePropertyModal}
                className="absolute top-3 right-3 z-40 w-10 h-10 bg-white/95 hover:bg-white backdrop-blur-xl text-[#1A1A1A] rounded-full flex items-center justify-center shadow-xl border border-white/50 hover:scale-110 hover:rotate-90 transition-all duration-300 group"
                aria-label="Close"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* LANDSCAPE LAYOUT - Always Side by Side */}
              <div className="flex h-full">

                {/* LEFT: Image Panel - Premium Gallery */}
                <div className="relative w-[42%] flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  {/* Main Image with Zoom Effect */}
                  <img
                    key={currentImageIndex}
                    src={selectedProperty.images[currentImageIndex]}
                    alt={selectedProperty.title}
                    className="modal-img absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

                  {/* Image Navigation Controls - Premium */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-[#d4af37] backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-[#d4af37] backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators - Premium Dots + Thumbnails */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3">
                    {/* Dots - Always Visible */}
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      {selectedProperty.images.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`rounded-full transition-all duration-300 ${
                            currentImageIndex === idx
                              ? 'w-6 h-1.5 bg-[#d4af37] shadow-lg shadow-[#d4af37]/50'
                              : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Thumbnails - Desktop Only */}
                    <div className="flex gap-1.5 justify-center">
                      {selectedProperty.images.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`thumb-img w-14 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                            currentImageIndex === idx
                              ? 'border-[#d4af37] shadow-md shadow-[#d4af37]/40 scale-105'
                              : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Premium Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white text-[9px] font-bold uppercase tracking-[0.1em] rounded-full shadow-lg">
                      <Crown className="w-2.5 h-2.5" />
                      {selectedProperty.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-xl text-white text-[9px] font-semibold uppercase tracking-[0.08em] rounded-full border border-white/15">
                      <Gem className="w-2.5 h-2.5 text-[#d4af37]" />
                      {selectedProperty.status}
                    </span>
                  </div>

                  {/* Price Badge - Premium */}
                  <div className="absolute bottom-24 right-3 z-20">
                    <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-2xl shadow-2xl border border-white/20">
                      <span className="text-[#1A1A1A] font-bold text-sm md:text-base">{selectedProperty.price}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Content Panel - Premium Design */}
                <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-[#FAF8F4] overflow-hidden min-w-0">

                  {/* Header - Premium */}
                  <div className="px-6 pt-5 pb-3 border-b border-gray-100/80 flex-shrink-0">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] leading-tight pr-4">
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[#6B7280] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                      <span className="text-sm truncate">{selectedProperty.location}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs flex-shrink-0">
                        <Calendar className="w-3 h-3 text-[#d4af37]" />
                        {selectedProperty.completion}
                      </span>
                    </div>
                  </div>

                  {/* Specs - Premium Grid */}
                  <div className="grid grid-cols-4 gap-2 px-6 py-3 flex-shrink-0">
                    {[
                      { icon: Bed, label: 'Beds', value: selectedProperty.bedrooms },
                      { icon: Bath, label: 'Baths', value: selectedProperty.bathrooms },
                      { icon: Maximize2, label: 'Sq.ft', value: selectedProperty.sqft },
                      { icon: Car, label: 'Park', value: selectedProperty.parking },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="spec-card flex flex-col items-center py-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#d4af37]/30 hover:shadow-md transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4 text-[#d4af37] mb-1" strokeWidth={1.6} />
                        <div className="text-[10px] text-[#6B7280] uppercase tracking-wide font-medium">{item.label}</div>
                        <div className="font-bold text-[#1A1A1A] text-base leading-none mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Description - Premium Quote */}
                  <div className="mx-6 mb-2 bg-gradient-to-r from-[#d4af37]/8 via-[#d4af37]/4 to-transparent rounded-xl px-4 py-3 border-l-[3px] border-[#d4af37]/40 flex-shrink-0">
                    <p className="text-[#4A4A5A] text-sm leading-relaxed italic line-clamp-2">
                      &ldquo;{selectedProperty.description}&rdquo;
                    </p>
                    <p className="text-[10px] text-[#d4af37] font-semibold mt-1 uppercase tracking-wider">— {selectedProperty.builder}</p>
                  </div>

                  {/* Amenities - Premium Pills */}
                  <div className="px-6 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest">Amenities</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-gray-100 text-[11px] text-[#4A4A5A] shadow-sm hover:border-[#d4af37]/40 hover:shadow-md transition-all duration-200"
                        >
                          <CheckCircle className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                          {amenity}
                        </span>
                      ))}
                      {selectedProperty.amenities.length > 6 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4af37]/8 rounded-full border border-[#d4af37]/20 text-[11px] text-[#b8942a] font-medium">
                          +{selectedProperty.amenities.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 min-h-0" />

                  {/* CTAs - Premium */}
                  <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex-shrink-0">
                    <div className="flex gap-3 mb-2">
                      <button
                        onClick={handleCall}
                        className="flex-1 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                      >
                        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        Call Now
                      </button>
                      <button
                        onClick={() => {
                          setEnquiryProperty(selectedProperty.title)
                          setIsEnquiryModalOpen(true)
                          closePropertyModal()
                        }}
                        className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#2a2a2a] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group"
                      >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        Enquire
                      </button>
                    </div>
                    
                    {/* Trust Badges - Premium */}
                    <div className="flex items-center justify-center gap-4 text-[11px] text-[#9CA3AF]">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-[#d4af37]" />
                        Verified
                      </span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-[#d4af37]" />
                        RERA
                      </span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                        4.9★
                      </span>
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