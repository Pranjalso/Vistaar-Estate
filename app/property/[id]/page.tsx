'use client'

import {
  MapPin, Bed, Bath, Square, Heart, Eye, Search, ArrowRight, ChevronDown,
  Sparkles, X, Check, Phone, Mail, User, Send, Share2, Calendar,
  ChevronLeft, ChevronRight, Building2
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Property {
  id: number
  title: string
  price: string
  location: string
  area: string
  units: string
  config: string
  configShort: string
  images: string[]
  status: string
  type: string
  badge: string
  bathrooms: number
  bedrooms: number
  sqft: string
  description: string
  amenities: string[]
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Vistaar Holachennai',
    price: '₹99 L - ₹3.21 Cr',
    location: 'Sholinganallur, Chennai',
    area: '30 Acres',
    units: '1818 Units',
    config: '2, 3 & 4 BHK Apts, 5 BHK Floor Villa & Villa',
    configShort: '2, 3 & 4 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    ],
    status: 'Available',
    type: 'luxury',
    badge: 'Premium',
    bathrooms: 3,
    bedrooms: 3,
    sqft: '1850',
    description:
      "Experience luxury living at Vistaar Holachennai, a premium residential project in the heart of Sholinganallur. With world-class amenities and spacious layouts, this property offers the perfect blend of comfort and elegance, minutes from IT parks, schools and hospitals.",
    amenities: ['Swimming Pool', 'Gymnasium', 'Club House', "Children's Play Area", 'Landscaped Gardens', '24/7 Security', 'Covered Parking', 'Power Backup'],
  },
  {
    id: 2,
    title: 'Vistaar Casablanca',
    price: '₹1.30 Cr - ₹3.50 Cr',
    location: 'Kanakapura, Bengaluru',
    area: '18 Acres',
    units: '805 Units',
    config: '2, 3 & 4 BHK Apts | 5BHK Flr Villa/Pent House',
    configShort: '2, 3 & 4 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
    ],
    status: 'Available',
    type: 'luxury',
    badge: 'Featured',
    bathrooms: 4,
    bedrooms: 4,
    sqft: '2400',
    description:
      'Vistaar Casablanca redefines luxury living with exquisite design and premium amenities. Spacious homes, stunning views and world-class facilities set inside a lush, vibrant community in Kanakapura.',
    amenities: ['Infinity Pool', 'Spa', 'Tennis Court', 'Golf Simulator', 'Home Theatre', 'Concierge Service', 'Wine Cellar', 'Private Lounge'],
  },
  {
    id: 3,
    title: 'Vistaar Highcity',
    price: '₹52 L - ₹72 L',
    location: 'ORR, Chennai',
    area: '41 Acres',
    units: '4000+ Units',
    config: '2 & 3 BHK Apts',
    configShort: '2 & 3 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
    ],
    status: 'Available',
    type: 'premium',
    badge: 'Popular',
    bathrooms: 2,
    bedrooms: 2,
    sqft: '1200',
    description:
      'Vistaar Highcity offers refined comfort in a prime location. Thoughtfully designed spaces and modern amenities sit alongside excellent connectivity to major IT hubs.',
    amenities: ['Swimming Pool', 'Gym', 'Community Hall', 'Kids Play Area', 'Walking Track', 'Security', 'Parking'],
  },
  {
    id: 4,
    title: 'Vistaar Green Valley',
    price: '₹1.50 Cr - ₹4.20 Cr',
    location: 'Whitefield, Bengaluru',
    area: '25 Acres',
    units: '1200 Units',
    config: '3, 4 BHK Apts & Villas',
    configShort: '3, 4 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=80',
    ],
    status: 'Coming Soon',
    type: 'luxury',
    badge: 'New Launch',
    bathrooms: 3,
    bedrooms: 3,
    sqft: '2000',
    description:
      'Vistaar Green Valley is the epitome of luxury living in Whitefield. Eco-friendly design, sustainable living and world-class facilities are wrapped in lush greenery.',
    amenities: ['Private Pool', 'Golf Course', 'Club House', 'Fine Dining', 'Meditation Centre', 'Yoga Studio', 'Organic Garden'],
  },
  {
    id: 5,
    title: 'Vistaar Palm Grove',
    price: '₹80 L - ₹1.90 Cr',
    location: 'ECR, Chennai',
    area: '15 Acres',
    units: '650 Units',
    config: '2, 3 BHK Apts with Sea View',
    configShort: '2, 3 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    ],
    status: 'Available',
    type: 'premium',
    badge: 'Premium',
    bathrooms: 2,
    bedrooms: 2,
    sqft: '1450',
    description:
      'Experience the perfect blend of luxury and nature at Vistaar Palm Grove. Breathtaking sea views on the scenic ECR, paired with premium amenities for an elevated lifestyle.',
    amenities: ['Ocean View', 'Swimming Pool', 'Beach Access', 'Gym', 'Restaurant', 'Sunset Deck', 'Water Sports'],
  },
  {
    id: 6,
    title: 'Vistaar Lake City',
    price: '₹45 L - ₹95 L',
    location: 'Hinjewadi, Pune',
    area: '35 Acres',
    units: '2500 Units',
    config: '1, 2, 3 BHK Apts',
    configShort: '1, 2, 3 BHK Apts',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      'https://images.unsplash.com/photo-1560184611-ff3e53f00e8f?w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80',
    ],
    status: 'Available',
    type: 'affordable',
    badge: 'Value',
    bathrooms: 2,
    bedrooms: 2,
    sqft: '950',
    description:
      'Vistaar Lake City offers affordable elegance in the vibrant Hinjewadi neighbourhood, with modern amenities and a serene lakeside setting.',
    amenities: ['Lake View', 'Swimming Pool', 'Gym', 'Community Centre', 'Park', 'Walking Trail', 'Picnic Area'],
  },
]

const tabs = [
  { id: 'all', label: 'All Properties' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'premium', label: 'Premium' },
  { id: 'affordable', label: 'Affordable' },
]

const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa', 'Penthouse']
const priceOptions = ['Below ₹50 L', '₹50 L - ₹1 Cr', '₹1 Cr - ₹2 Cr', '₹2 Cr - ₹3 Cr', 'Above ₹3 Cr']

/* ------------------------------------------------------------------ */
/*  Property Detail Modal                                              */
/* ------------------------------------------------------------------ */

const PropertyModal = ({
  property,
  onClose,
}: {
  property: Property
  onClose: () => void
}) => {
  const [activeImage, setActiveImage] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 280)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') setActiveImage((p) => (p + 1) % property.images.length)
      if (e.key === 'ArrowLeft') setActiveImage((p) => (p - 1 + property.images.length) % property.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [handleClose, property.images.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ name: '', email: '', phone: '' })
      }, 2800)
    }, 1200)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 ${
        isClosing ? 'animate-modal-out' : 'animate-modal-in'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${property.title} details`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0c0c16]/70 backdrop-blur-sm ${
          isClosing ? 'animate-fade-out' : 'animate-fade-in'
        }`}
        onClick={handleClose}
      />

      {/* Modal panel */}
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row ${
          isClosing ? 'animate-scale-out' : 'animate-scale-in'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-all duration-300 shadow-md hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto w-full">
          {/* Image gallery */}
          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden bg-gray-100 group">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${property.title} view ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  idx === activeImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            {/* Gallery nav */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((p) => (p - 1 + property.images.length) % property.images.length)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/25 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImage((p) => (p + 1) % property.images.length)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/25 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeImage ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                  property.status === 'Available' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                }`}
              >
                {property.status}
              </span>
              <span className="px-3 py-1 bg-[#d4af37]/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                {property.badge}
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-16 sm:bottom-8 sm:left-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-white mb-1.5 drop-shadow-sm">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-white/90 text-sm">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                {property.location}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
            {/* Left: details */}
            <div className="lg:col-span-2 animate-rise" style={{ animationDelay: '80ms' }}>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-2xl sm:text-3xl font-bold text-[#d4af37]">{property.price}</span>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-7">
                {[
                  { icon: Bed, val: property.bedrooms, label: 'Beds' },
                  { icon: Bath, val: property.bathrooms, label: 'Baths' },
                  { icon: Square, val: property.sqft, label: 'Sq.Ft' },
                  { icon: Building2, val: property.area, label: 'Area' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <s.icon className="w-4 h-4 text-[#d4af37] mx-auto mb-1.5" />
                    <div className="text-[#1a1a2e] font-semibold text-sm">{s.val}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-serif font-semibold text-[#1a1a2e] mb-2">About this Property</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">{property.description}</p>

              <h3 className="text-lg font-serif font-semibold text-[#1a1a2e] mb-3">Configuration</h3>
              <div className="flex flex-wrap gap-2 mb-7">
                <span className="px-4 py-1.5 bg-[#d4af37]/10 text-[#b8942a] rounded-full text-xs font-medium">
                  {property.config}
                </span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {property.units}
                </span>
              </div>

              <h3 className="text-lg font-serif font-semibold text-[#1a1a2e] mb-3">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
                {property.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 animate-rise"
                    style={{ animationDelay: `${120 + i * 40}ms` }}
                  >
                    <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                    <span className="text-sm text-gray-600">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: enquiry form */}
            <div className="lg:col-span-1 animate-rise" style={{ animationDelay: '160ms' }}>
              <div className="bg-gradient-to-b from-[#1a1a2e] to-[#26263f] rounded-2xl p-6 text-white sticky top-0">
                <h3 className="text-lg font-serif font-semibold mb-1 text-center">Enquire Now</h3>
                <p className="text-xs text-white/50 text-center mb-5">We'll get back to you within 24 hours</p>

                {isSuccess ? (
                  <div className="text-center py-8 animate-rise">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-400/20 flex items-center justify-center">
                      <Check className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h4 className="font-semibold">Thank You!</h4>
                    <p className="text-xs text-white/50 mt-1">Our team will contact you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm placeholder:text-white/40"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm placeholder:text-white/40"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone Number"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm placeholder:text-white/40"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Enquiry
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="w-full py-3 border border-white/15 text-white/80 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Site Visit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Property Card                                                      */
/* ------------------------------------------------------------------ */

const PropertyCard = ({
  property,
  index,
  onView,
}: {
  property: Property
  index: number
  onView: (p: Property) => void
}) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(26,26,46,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(26,26,46,0.25)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 animate-rise"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 text-[11px] font-semibold rounded-full backdrop-blur-sm shadow-sm ${
              property.status === 'Available' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
            }`}
          >
            {property.status}
          </span>
          <span className="px-3 py-1 bg-[#d4af37]/90 text-white text-[11px] font-semibold rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {property.badge}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite((v) => !v)
          }}
          aria-label="Save to favorites"
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-all duration-300"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isFavorite ? 'fill-[#d4af37] text-[#d4af37] scale-110' : 'text-[#1a1a2e]'
            }`}
          />
        </button>

        {/* View details overlay button */}
        <button
          onClick={() => onView(property)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="px-6 py-2.5 bg-white/95 backdrop-blur-sm text-[#1a1a2e] rounded-full font-medium text-sm shadow-lg flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 hover:bg-[#1a1a2e] hover:text-white">
            <Eye className="w-4 h-4" />
            View Details
          </span>
        </button>

        {/* Price ribbon on image (mobile-friendly quick glance) */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-white font-serif text-lg font-semibold leading-tight drop-shadow-sm">
              {property.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <span className="text-[#d4af37] font-semibold text-sm whitespace-nowrap">{property.price}</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4 mt-3 p-3 bg-gray-50/80 rounded-xl group-hover:bg-[#d4af37]/[0.06] transition-colors duration-500">
          <div className="text-center">
            <div className="text-[#1a1a2e] font-semibold text-sm">{property.bedrooms}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Beds</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-[#1a1a2e] font-semibold text-sm">{property.bathrooms}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Baths</div>
          </div>
          <div className="text-center">
            <div className="text-[#1a1a2e] font-semibold text-sm">{property.sqft}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Sq.Ft</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate max-w-[120px]">
            {property.configShort}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{property.area}</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{property.units}</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onView(property)}
          className="w-full py-3 bg-[#1a1a2e] text-white text-sm font-medium rounded-xl hover:bg-[#d4af37] transition-all duration-300 hover:shadow-md hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2 group/btn"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const PropertyCards = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchConfig, setSearchConfig] = useState('')
  const [searchPrice, setSearchPrice] = useState('')
  const [visibleCards, setVisibleCards] = useState(3)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const filteredProperties = properties.filter((p) => {
    const matchTab = activeTab === 'all' || p.type === activeTab
    const matchConfig = searchConfig === '' || p.config.includes(searchConfig.replace(' BHK', ''))
    return matchTab && matchConfig
  })

  const displayedProperties = filteredProperties.slice(0, visibleCards)
  const hasMore = visibleCards < filteredProperties.length

  const handleViewMore = () => setVisibleCards((prev) => Math.min(prev + 3, filteredProperties.length))

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-[#f8f5f0] overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#1a1a2e]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-rise">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4af37]/10 text-[#b8942a] text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full mb-4 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Collection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#1a1a2e] mb-4">
            A Place That You <span className="text-[#d4af37] font-medium italic">Call Home</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-light">
            Discover our curated collection of premium properties designed for the discerning few
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-10 animate-rise" style={{ animationDelay: '80ms' }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setVisibleCards(3)
                }}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id ? 'bg-[#1a1a2e] text-white shadow-sm' : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Configuration</label>
              <select
                value={searchConfig}
                onChange={(e) => setSearchConfig(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm text-gray-700"
              >
                <option value="">All Configurations</option>
                {configOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Price Range</label>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm text-gray-700"
              >
                <option value="">All Prices</option>
                {priceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchConfig('')
                  setSearchPrice('')
                }}
                className="px-6 py-2.5 text-sm text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} onView={setSelectedProperty} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={handleViewMore}
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent border border-[#1a1a2e] text-[#1a1a2e] rounded-full hover:bg-[#1a1a2e] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md font-medium text-sm sm:text-base"
            >
              <span>View More Properties</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {!hasMore && filteredProperties.length > 3 && (
          <div className="text-center mt-12 md:mt-16">
            <p className="text-gray-400 text-sm">You've viewed all {filteredProperties.length} properties</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      <style jsx global>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-rise {
          animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        .animate-fade-in { animation: fade-in 0.25s ease-out both; }
        .animate-fade-out { animation: fade-out 0.25s ease-in both; }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scale-out {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.94) translateY(12px); }
        }
        .animate-scale-in { animation: scale-in 0.32s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-scale-out { animation: scale-out 0.25s cubic-bezier(0.4, 0, 1, 1) both; }

        .animate-modal-in, .animate-modal-out { animation: none; }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 1.2s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .animate-rise, .animate-fade-in, .animate-fade-out,
          .animate-scale-in, .animate-scale-out, .animate-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default PropertyCards