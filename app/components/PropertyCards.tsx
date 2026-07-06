'use client'

import {
  MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles, X,
  Phone, Mail, ChevronLeft, ChevronRight,
  Shield, ChevronDown, CheckCircle,
  Car, Search, Calendar,
  Waves, Lock, Trees, Users2, Coffee,
  Maximize2, Crown, Gem, Star, Award,
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import EnquiryModal from './EnquiryModal'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface Property {
  id: number
  title: string
  location: string
  price: string
  priceMin: number
  priceMax: number
  description: string
  image: string
  images: string[]
  bedrooms: number
  bathrooms: number
  sqft: string
  parking: number
  completion: string
  status: string
  badge: string
  builder: string
  availableConfigs: string[]
  amenities: string[]
  premiumAmenities: string[]
}

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const PHONE_NUMBER = '+919999999999'

const properties: Property[] = [
  {
    id: 1,
    title: 'The Grand Vista Residences',
    location: 'Sholinganallur, Chennai',
    price: '₹2.50 Cr - ₹5.80 Cr',
    priceMin: 250, priceMax: 580,
    description: 'A masterpiece of contemporary architecture with panoramic views of the city skyline.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    bedrooms: 4, bathrooms: 5, sqft: '4,200', parking: 4,
    completion: '2025', status: 'New Launch', badge: 'Premium',
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
    priceMin: 380, priceMax: 720,
    description: 'An alpine retreat redefined with brutalist elegance and unparalleled panoramic views.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    ],
    bedrooms: 5, bathrooms: 6, sqft: '5,800', parking: 3,
    completion: '2025', status: 'Ready to Move', badge: 'Luxury',
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
    priceMin: 450, priceMax: 890,
    description: 'A historic estate seamlessly blended with modern pavilions, set amidst private woodland.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    bedrooms: 6, bathrooms: 7, sqft: '8,500', parking: 6,
    completion: '2024', status: 'Limited Units', badge: 'Exclusive',
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
    priceMin: 280, priceMax: 480,
    description: 'An exquisite lakeside property with private garden and breathtaking views.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    ],
    bedrooms: 4, bathrooms: 4, sqft: '3,800', parking: 3,
    completion: '2024', status: 'Ready to Move', badge: 'Premium',
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
    priceMin: 850, priceMax: 1250,
    description: 'A stunning penthouse with panoramic sea views and private rooftop pool.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    bedrooms: 3, bathrooms: 4, sqft: '3,200', parking: 2,
    completion: '2025', status: 'New Launch', badge: 'Luxury',
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
    priceMin: 190, priceMax: 380,
    description: 'A Mediterranean masterpiece featuring private beach access and lush gardens.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    ],
    bedrooms: 4, bathrooms: 4, sqft: '4,500', parking: 4,
    completion: '2024', status: 'Ready to Move', badge: 'Premium',
    builder: 'Vistaar Estates',
    availableConfigs: ['3', '4'],
    amenities: ['Private Beach', 'Pool', 'Garden', 'Smart Home', 'Tennis Court', 'Gym', 'Clubhouse', 'Security'],
    premiumAmenities: ['Pool', 'Security', 'Garden', 'Beach'],
  },
]

const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa', 'Penthouse']
const priceOptions = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Below ₹1 Cr', min: 0, max: 100 },
  { label: '₹1 Cr - ₹2 Cr', min: 100, max: 200 },
  { label: '₹2 Cr - ₹3 Cr', min: 200, max: 300 },
  { label: '₹3 Cr - ₹5 Cr', min: 300, max: 500 },
  { label: '₹5 Cr - ₹10 Cr', min: 500, max: 1000 },
  { label: '₹10 Cr+', min: 1000, max: Infinity },
]
const locationOptions = [
  'All Locations', 'Sholinganallur, Chennai', 'Kanakapura, Bengaluru',
  'ECR, Chennai', 'Whitefield, Bengaluru', 'Powai, Mumbai',
]

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const PropertyCards = () => {
  const [searchConfig, setSearchConfig] = useState('')
  const [searchPrice, setSearchPrice] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [visibleCards, setVisibleCards] = useState(3)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryProperty, setEnquiryProperty] = useState('')
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedProperty])

  const handleCall = useCallback(() => {
    window.location.href = `tel:${PHONE_NUMBER}`
  }, [])

  /* ── Filtered + paginated ── */
  const filteredProperties = properties.filter((p) => {
    if (searchConfig) {
      const configSearch = searchConfig.replace(' BHK', '').trim()
      if (!p.availableConfigs.some((c) => c === configSearch)) return false
    }
    if (searchPrice && searchPrice !== 'All Budgets') {
      const opt = priceOptions.find((o) => o.label === searchPrice)
      if (opt) {
        const { min: fMin, max: fMax } = opt
        if (!(p.priceMax >= fMin && p.priceMin <= fMax)) return false
      }
    }
    if (searchLocation && searchLocation !== 'All Locations') {
      if (p.location !== searchLocation) return false
    }
    return true
  })

  const displayedProperties = filteredProperties.slice(0, visibleCards)
  const hasMore = visibleCards < filteredProperties.length

  /* ── Animation variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <>
      <style jsx global>{`
        /* ── Cards ── */
        .property-card {
          transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
        }
        .property-card:hover .property-image {
          transform: scale(1.06);
        }
        .property-image {
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .amenity-chip {
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .amenity-chip:hover {
          transform: translateY(-2px);
          background: #fff;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
          border-color: #d4af37;
        }
        .amenity-chip:hover .amenity-icon {
          color: #d4af37;
        }
        .view-details-btn {
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .view-details-btn:hover {
          background: #d4af37;
          color: #fff;
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
        .filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 12px;
          padding-right: 36px;
        }
        .mobile-filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 14px;
          padding-right: 44px;
        }
        /* ── Modal image gallery ── */
        .modal-main-img {
          transition: opacity 0.35s ease;
        }
        .thumb-btn {
          transition: all 0.25s ease;
        }
        .thumb-btn:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* ═══════════════════════════════════════════════
          PROPERTIES SECTION
          ═══════════════════════════════════════════════ */}
      <section ref={ref} id="properties" className="py-16 md:py-24 bg-[#FAF8F4] relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a1a2e]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            className="mb-10 md:mb-12 text-center lg:text-left"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <h2 className="text-3xl font-serif font-light text-[#1A1A1A] mb-3 leading-[1.1]">
              Discover Luxury Homes<br />
              <span className="text-[#d4af37] font-medium">Crafted for Modern Living</span>
            </h2>
            <p className="text-[#6B7280] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover a curated collection of the world's most prestigious residences,
              where architectural mastery meets unparalleled elegance.
            </p>
          </motion.div>

          {/* Desktop Filters */}
          <motion.div
            className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d4af37]/10 p-4 md:p-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <FilterSelect label="Configuration" value={searchConfig} onChange={setSearchConfig} options={configOptions} placeholder="All Configurations" />
              <FilterSelect label="Budget" value={searchPrice} onChange={setSearchPrice} options={priceOptions.map((o) => o.label)} placeholder="All Budgets" />
              <FilterSelect label="Location" value={searchLocation} onChange={setSearchLocation} options={locationOptions} placeholder="All Locations" />
              <div className="flex items-end">
                <button
                  onClick={() => { setSearchConfig(''); setSearchPrice(''); setSearchLocation('') }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FilterSelectMobile label="Configuration" value={searchConfig} onChange={setSearchConfig} options={configOptions} placeholder="Config" />
              <FilterSelectMobile label="Budget" value={searchPrice} onChange={setSearchPrice} options={priceOptions.map((o) => o.label)} placeholder="Budget" />
            </div>
            <FilterSelectMobile label="Location" value={searchLocation} onChange={setSearchLocation} options={locationOptions} placeholder="All Locations" />
          </div>

          {/* Results Count */}
          {filteredProperties.length > 0 && (
            <div className="mb-5 text-sm text-[#6B7280]">
              Showing <span className="font-semibold text-[#1A1A1A]">{filteredProperties.length}</span> properties
            </div>
          )}

          {/* Cards Grid */}
          {filteredProperties.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
            >
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variants={cardVariants}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              onClear={() => { setSearchConfig(''); setSearchPrice(''); setSearchLocation('') }}
            />
          )}

          {hasMore && filteredProperties.length > 0 && (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setVisibleCards((v) => Math.min(v + 3, filteredProperties.length))}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white border border-[#d4af37]/30 text-[#1A1A1A] rounded-full hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all duration-400 font-medium text-sm hover:shadow-xl hover:shadow-[#d4af37]/20"
              >
                <span>View More Properties</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROPERTY DETAIL MODAL
          ═══════════════════════════════════════════════ */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onCall={handleCall}
        onEnquire={(title) => {
          setEnquiryProperty(title)
          setIsEnquiryModalOpen(true)
          setSelectedProperty(null)
        }}
      />

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

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════ */

/* ── Filter Select (Desktop) ── */
function FilterSelect({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-select w-full px-4 py-2.5 bg-white/70 border border-[#d4af37]/10 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-[#1A1A1A] cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

/* ── Filter Select (Mobile) ── */
function FilterSelectMobile({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[#6B7280] mb-1 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mobile-filter-select w-full px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all text-sm text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

/* ── Property Card ── */
function PropertyCard({
  property, variants, onClick,
}: {
  property: Property
  variants: any
  onClick: () => void
}) {
  const iconMap: Record<string, any> = {
    Pool: Waves,
    Security: Lock,
    Garden: Trees,
    Clubhouse: Users2,
    Cafe: Coffee,
    Spa: Sparkles,
    Beach: Users2,
    'Smart Home': Sparkles,
  }

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#d4af37]/5 property-card cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden bg-gray-100">
        <Image src={property.image} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover property-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-[#d4af37] text-white text-[9px] font-medium uppercase tracking-[0.15em] rounded-full shadow-lg">{property.badge}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="price-chip bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg border border-white/30">
            <span className="text-[#1A1A1A] font-semibold text-xs">{property.price}</span>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-serif font-medium text-[#1A1A1A] leading-tight group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-1.5 text-[#6B7280] text-xs md:text-sm mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <p className="text-[#6B7280] text-xs md:text-sm leading-relaxed mt-2 line-clamp-2">{property.description}</p>
        <div className="mt-3 pt-3 border-t border-gray-100/50 flex items-center justify-between">
          <Spec icon={Bed} value={property.bedrooms} />
          <Spec icon={Bath} value={property.bathrooms} />
          <Spec icon={Ruler} value={property.sqft} />
          <Spec icon={Car} value={property.parking} />
        </div>
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {property.premiumAmenities.map((a, i) => {
            const Icon = iconMap[a] || Sparkles
            return (
              <span key={i} className="amenity-chip flex items-center gap-1 px-2.5 py-1 bg-[#F8F6F2] border border-gray-100/50 rounded-full text-[10px] text-[#6B7280] cursor-default">
                <Icon className="w-3 h-3 amenity-icon text-[#d4af37]/70" />
                {a}
              </span>
            )
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100/50">
          <button
            onClick={(e) => { e.stopPropagation(); onClick() }}
            className="view-details-btn group inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#d4af37]/30 rounded-full text-xs font-medium text-[#1A1A1A]"
          >
            View Details <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function Spec({ icon: Icon, value }: { icon: React.ElementType; value: string | number }) {
  return (
    <div className="flex items-center gap-1.5 text-[#6B7280]">
      <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
      <span className="text-xs font-medium text-[#1A1A1A]">{value}</span>
    </div>
  )
}

/* ── Empty State ── */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">No Properties Found</h3>
      <p className="text-[#6B7280]">Try adjusting your filters to find the perfect property</p>
      <button
        onClick={onClear}
        className="mt-4 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full hover:shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 text-sm font-medium"
      >
        Clear All Filters
      </button>
    </div>
  )
}

/* ── Property Detail Modal ── */
function PropertyDetailModal({
  property,
  onClose,
  onCall,
  onEnquire,
}: {
  property: Property | null
  onClose: () => void
  onCall: () => void
  onEnquire: (title: string) => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset index when property changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [property])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (property) {
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [property, onClose])

  if (!property) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0a0a12]/92 via-[#1a1a1a]/85 to-[#0a0a12]/92 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold Top Strip */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b8942a] via-[#e8c84a] to-[#b8942a] z-40" />

            {/* ────────────────────────────────────────
                DESKTOP (≥640px): side-by-side
                ──────────────────────────────────────── */}
            <div className="hidden sm:flex flex-row max-h-[85vh]">
              {/* LEFT: Image with Slider */}
              <div className="relative w-[45%] flex-shrink-0 bg-gray-900">
                <div className="absolute inset-0">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage() }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/40 hover:bg-[#d4af37] backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage() }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/40 hover:bg-[#d4af37] backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {property.images.length > 1 && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {property.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          currentImageIndex === idx
                            ? 'w-5 h-1.5 bg-[#d4af37] shadow-lg shadow-[#d4af37]/50'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-full shadow-lg">
                    <Crown className="w-3 h-3" /> {property.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-lg text-white text-[10px] font-semibold uppercase tracking-[0.08em] rounded-full border border-white/10">
                    <Gem className="w-3 h-3 text-[#d4af37]" /> {property.status}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-40 w-9 h-9 bg-white/90 hover:bg-white backdrop-blur-xl text-[#1A1A1A] rounded-full flex items-center justify-center shadow-lg border border-white/30 hover:scale-110 hover:rotate-90 transition-all duration-300"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* RIGHT: Details */}
              <div className="flex-1 min-w-0 overflow-y-auto bg-gradient-to-b from-white to-[#FAF8F4]">
                <div className="p-6 lg:p-8">
                  <h2 className="text-xl lg:text-2xl font-serif font-bold text-[#1A1A1A] leading-tight pr-6">
                    {property.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[#6B7280] mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                    <span className="text-sm">{property.location}</span>
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      {property.completion}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[
                      { icon: Bed, label: 'Beds', value: property.bedrooms },
                      { icon: Bath, label: 'Baths', value: property.bathrooms },
                      { icon: Maximize2, label: 'Sq.ft', value: property.sqft },
                      { icon: Car, label: 'Parking', value: property.parking },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm"
                      >
                        <item.icon className="w-4 h-4 text-[#d4af37] mb-1" strokeWidth={1.6} />
                        <div className="text-[9px] text-[#6B7280] uppercase tracking-wide font-medium">{item.label}</div>
                        <div className="font-bold text-[#1A1A1A] text-sm leading-none mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-[#d4af37]/8 via-[#d4af37]/4 to-transparent rounded-xl px-4 py-3 border-l-[3px] border-[#d4af37]/40">
                    <p className="text-[#4A4A5A] text-sm leading-relaxed italic">
                      &ldquo;{property.description}&rdquo;
                    </p>
                    <p className="text-[10px] text-[#d4af37] font-semibold mt-1 uppercase tracking-wider">
                      — {property.builder}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest">Amenities</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {property.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full border border-gray-100 text-[10px] text-[#4A4A5A] shadow-sm"
                        >
                          <CheckCircle className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200/80">
                    <div className="flex gap-3 mb-3">
                      <button
                        onClick={onCall}
                        className="flex-1 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                      >
                        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        Call Now
                      </button>
                      <button
                        onClick={() => onEnquire(property.title)}
                        className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#2a2a2a] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group"
                      >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        Enquire
                      </button>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-[11px] text-[#9CA3AF]">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#d4af37]" />Verified</span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[#d4af37]" />RERA</span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />4.9★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ────────────────────────────────────────
                MOBILE (<640px): STUNNING MINIMAL LAYOUT
                Ultra compact, clean, premium
                ──────────────────────────────────────── */}
            <div className="flex sm:hidden flex-row h-[290px] max-h-[75vh]">
              {/* LEFT: Image - 32% with gradient overlay */}
              <div className="relative w-[32%] flex-shrink-0 bg-gray-900 overflow-hidden rounded-l-2xl">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Premium gradient overlay - dark at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                {/* Navigation Arrows - Minimal */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage() }}
                      className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 bg-black/30 hover:bg-[#d4af37] backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/5"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage() }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 bg-black/30 hover:bg-[#d4af37] backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/5"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </>
                )}

                {/* Image Dots - Minimal */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                    {property.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          currentImageIndex === idx
                            ? 'w-3 h-1 bg-[#d4af37]'
                            : 'w-1 h-1 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badge - Minimal premium */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white text-[6px] font-bold uppercase tracking-[0.06em] rounded-full shadow-lg">
                    <Crown className="w-2 h-2" /> {property.badge}
                  </span>
                </div>

                {/* Close Button - Clean */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 z-40 w-6 h-6 bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] rounded-full flex items-center justify-center shadow-md border border-white/20 active:scale-95 transition-all"
                  aria-label="Close"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* RIGHT: Content - Clean, spacious, minimal */}
              <div className="flex-1 min-w-0 flex flex-col bg-white rounded-r-2xl p-3">
                {/* Title */}
                <h2 className="text-[13px] font-serif font-bold text-[#1A1A1A] leading-tight line-clamp-1 tracking-tight">
                  {property.title}
                </h2>
                
                {/* Location + Year - Clean row */}
                <div className="flex items-center gap-1 text-[#6B7280] mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-[#d4af37] flex-shrink-0" />
                  <span className="text-[9px] truncate font-medium">{property.location}</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[8px] text-[#6B7280] font-medium">
                    <Calendar className="w-2.5 h-2.5 text-[#d4af37]" />
                    {property.completion}
                  </span>
                </div>

                {/* Price - Premium card */}
                <div className="mt-1.5 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-lg px-3 py-1.5 border border-[#d4af37]/10">
                  <span className="text-[#1A1A1A] font-bold text-[12px] tracking-tight">{property.price}</span>
                </div>

                {/* Specs - Clean 4-column */}
                <div className="grid grid-cols-4 gap-1 mt-1.5">
                  {[
                    { icon: Bed, label: 'Beds', value: property.bedrooms },
                    { icon: Bath, label: 'Baths', value: property.bathrooms },
                    { icon: Maximize2, label: 'Sqft', value: property.sqft },
                    { icon: Car, label: 'Park', value: property.parking },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center bg-[#FAF8F4] rounded-lg py-1.5"
                    >
                      <item.icon className="w-3 h-3 text-[#d4af37]" strokeWidth={1.5} />
                      <div className="text-[6px] text-[#6B7280] uppercase tracking-wide font-semibold mt-0.5">{item.label}</div>
                      <div className="font-bold text-[#1A1A1A] text-[10px] leading-tight">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Description - Clean quote */}
                <div className="mt-1.5 bg-[#FAF8F4] rounded-lg px-2.5 py-1.5 border-l-2 border-[#d4af37]">
                  <p className="text-[#4A4A5A] text-[8px] leading-relaxed italic line-clamp-1">
                    &ldquo;{property.description}&rdquo;
                  </p>
                  <p className="text-[6px] text-[#d4af37] font-bold uppercase tracking-wider mt-0.5">
                    — {property.builder}
                  </p>
                </div>

                {/* Amenities - Minimal chips */}
                <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                  <Sparkles className="w-2.5 h-2.5 text-[#d4af37] flex-shrink-0" />
                  <span className="text-[6px] font-bold text-[#1A1A1A] uppercase tracking-widest mr-0.5">Amenities</span>
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FAF8F4] rounded-full text-[7px] text-[#4A4A5A] border border-gray-100"
                    >
                      <CheckCircle className="w-2 h-2 text-[#d4af37] flex-shrink-0" />
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-[7px] text-[#d4af37] font-bold">+{property.amenities.length - 3}</span>
                  )}
                </div>

                {/* Spacer */}
                <div className="flex-1 min-h-0" />

                {/* Actions - Clean buttons */}
                <div className="mt-auto pt-1.5 border-t border-gray-100 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <button
                      onClick={onCall}
                      className="flex-1 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </button>
                    <button
                      onClick={() => onEnquire(property.title)}
                      className="flex-1 py-1.5 bg-[#1A1A1A] text-white rounded-lg font-semibold text-[10px] flex items-center justify-center gap-1 active:scale-95 transition-all duration-200 hover:bg-[#2a2a2a]"
                    >
                      <Mail className="w-3 h-3" />
                      Enquire
                    </button>
                  </div>
                  {/* Trust - Ultra minimal */}
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-[6px] text-[#9CA3AF] font-medium">
                    <span className="flex items-center gap-0.5"><Shield className="w-2 h-2 text-[#d4af37]" />Verified</span>
                    <span className="w-px h-2 bg-gray-200" />
                    <span className="flex items-center gap-0.5"><Award className="w-2 h-2 text-[#d4af37]" />RERA</span>
                    <span className="w-px h-2 bg-gray-200" />
                    <span className="flex items-center gap-0.5"><Star className="w-2 h-2 text-[#d4af37] fill-[#d4af37]" />4.9★</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}