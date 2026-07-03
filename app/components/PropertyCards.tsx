'use client'

import { 
  MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles, X, 
  Phone, Mail, ChevronLeft, ChevronRight, 
  Shield, ChevronDown,
  CheckCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import EnquiryModal from './EnquiryModal'

const PropertyCards = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchConfig, setSearchConfig] = useState('')
  const [searchPrice, setSearchPrice] = useState('')
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

  const properties = [
    {
      id: 1,
      title: 'Vistaar Holachennai',
      price: '₹99 L - ₹3.21 Cr',
      location: 'Sholinganallur, Chennai',
      area: '30 Acres',
      units: '1818 Units',
      config: '2, 3 & 4 BHK Apts',
      configFull: '2, 3 & 4 BHK Apts, 5 BHK Floor Villa & Villa',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      ],
      type: 'luxury',
      bathrooms: 3,
      bedrooms: 3,
      sqft: '1850',
      completion: '2025',
      description: 'Experience the pinnacle of luxury living at Vistaar Holachennai. This architectural masterpiece in Sholinganallur offers meticulously crafted residences with panoramic views and world-class amenities.',
      amenities: ['Infinity Pool', 'State-of-the-art Gym', 'Clubhouse', 'Landscaped Gardens', '24/7 Concierge', 'Smart Home Automation', 'EV Charging', 'Children\'s Play Area'],
      priceRange: { min: 99, max: 321 },
      availableConfigs: ['2', '3', '4', '5']
    },
    {
      id: 2,
      title: 'Vistaar Casablanca',
      price: '₹1.30 Cr - ₹3.50 Cr',
      location: 'Kanakapura, Bengaluru',
      area: '18 Acres',
      units: '805 Units',
      config: '2, 3 & 4 BHK Apts',
      configFull: '2, 3 & 4 BHK Apts | 5BHK Flr Villa/Pent House',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      type: 'luxury',
      bathrooms: 4,
      bedrooms: 4,
      sqft: '2400',
      completion: '2024',
      description: 'Vistaar Casablanca sets new benchmarks in luxury living. Nestled in the serene landscapes of Kanakapura, this exclusive enclave offers unparalleled elegance and sophistication.',
      amenities: ['Private Spa', 'Tennis Court', 'Infinity Pool', 'Wine Cellar', 'Private Cinema', 'Concierge', 'Valet Parking', 'Security'],
      priceRange: { min: 130, max: 350 },
      availableConfigs: ['2', '3', '4', '5']
    },
    {
      id: 3,
      title: 'Vistaar Highcity',
      price: '₹52 L - ₹72 L',
      location: 'ORR, Chennai',
      area: '41 Acres',
      units: '4000+ Units',
      config: '2 & 3 BHK Apts',
      configFull: '2 & 3 BHK Apts',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      type: 'premium',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '1200',
      completion: '2026',
      description: 'Vistaar Highcity represents the future of urban living. Located along the vibrant OMR, this township offers contemporary homes designed for modern lifestyles.',
      amenities: ['Clubhouse', 'Gymnasium', 'Swimming Pool', 'Kids Zone', 'CCTV Surveillance', 'Maintenance', 'Retail Outlets', 'Community Hall'],
      priceRange: { min: 52, max: 72 },
      availableConfigs: ['2', '3']
    },
    {
      id: 4,
      title: 'Vistaar Green Valley',
      price: '₹1.50 Cr - ₹4.20 Cr',
      location: 'Whitefield, Bengaluru',
      area: '25 Acres',
      units: '1200 Units',
      config: '3, 4 BHK Apts',
      configFull: '3, 4 BHK Apts & Villas',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      type: 'luxury',
      bathrooms: 3,
      bedrooms: 3,
      sqft: '2000',
      completion: '2025',
      description: 'Vistaar Green Valley is a landmark development in Whitefield. This eco-friendly enclave combines luxury living with nature, offering villas and apartments surrounded by lush greenery.',
      amenities: ['Organic Garden', 'Yoga Studio', 'Cafe', 'Butler Service', 'Smart Home', 'Green Building', 'Walking Trails', 'Bird Watching'],
      priceRange: { min: 150, max: 420 },
      availableConfigs: ['3', '4']
    },
    {
      id: 5,
      title: 'Vistaar Palm Grove',
      price: '₹80 L - ₹1.90 Cr',
      location: 'ECR, Chennai',
      area: '15 Acres',
      units: '650 Units',
      config: '2, 3 BHK Apts',
      configFull: '2, 3 BHK Apts with Sea View',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      type: 'premium',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '1450',
      completion: '2024',
      description: 'Vistaar Palm Grove offers an exclusive beachfront living experience along the scenic ECR. Wake up to stunning sea views and enjoy resort-style amenities every day.',
      amenities: ['Private Beach Access', 'Infinity Pool', 'Jacuzzi', 'Spa', 'Beach Cafe', 'Gym', 'Private Garden', 'Sunset Deck'],
      priceRange: { min: 80, max: 190 },
      availableConfigs: ['2', '3']
    },
    {
      id: 6,
      title: 'Vistaar Lake City',
      price: '₹45 L - ₹95 L',
      location: 'Hinjewadi, Pune',
      area: '35 Acres',
      units: '2500 Units',
      config: '1, 2, 3 BHK Apts',
      configFull: '1, 2, 3 BHK Apts',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      ],
      type: 'affordable',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '950',
      completion: '2026',
      description: 'Vistaar Lake City redefines affordable luxury in Pune\'s IT hub. This expansive township offers serene lake views, modern amenities, and excellent connectivity.',
      amenities: ['Lake View', 'Walking Trails', 'Playground', 'Community Hall', 'Security', 'Vendor Court', 'Cycle Tracks', 'Picnic Spots'],
      priceRange: { min: 45, max: 95 },
      availableConfigs: ['1', '2', '3']
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Properties' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'premium', label: 'Premium' },
    { id: 'affordable', label: 'Affordable' },
  ]

  const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa', 'Penthouse']
  const priceOptions = [
    { label: 'Below ₹50 L', min: 0, max: 50 },
    { label: '₹50 L - ₹1 Cr', min: 50, max: 100 },
    { label: '₹1 Cr - ₹2 Cr', min: 100, max: 200 },
    { label: '₹2 Cr - ₹3 Cr', min: 200, max: 300 },
    { label: 'Above ₹3 Cr', min: 300, max: Infinity }
  ]

  const filteredProperties = properties.filter(p => {
    const matchTab = activeTab === 'all' || p.type === activeTab
    
    let matchConfig = true
    if (searchConfig) {
      const configSearch = searchConfig.replace(' BHK', '').trim()
      matchConfig = p.availableConfigs.some(config => config === configSearch)
    }
    
    let matchPrice = true
    if (searchPrice) {
      const selectedPriceOption = priceOptions.find(opt => opt.label === searchPrice)
      if (selectedPriceOption) {
        const { min: filterMin, max: filterMax } = selectedPriceOption
        const { min: propMin, max: propMax } = p.priceRange
        matchPrice = propMax >= filterMin && propMin <= filterMax
      }
    }
    
    return matchTab && matchConfig && matchPrice
  })

  const displayedProperties = filteredProperties.slice(0, visibleCards)
  const hasMore = visibleCards < filteredProperties.length

  const handleViewMore = () => {
    setVisibleCards(prev => Math.min(prev + 3, filteredProperties.length))
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
      `}</style>

      <section ref={ref} id="properties" className="py-20 md:py-28 bg-gradient-to-b from-[#f8f5f0] to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center max-w-3xl mx-auto mb-16 animate-on-scroll ${isInView ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 text-[#d4af37] text-xs uppercase tracking-[0.3em] rounded-full mb-5 border border-[#d4af37]/20 font-medium">
              <Sparkles className="w-4 h-4" />
              Premium Collection
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#1a1a2e] mb-4 leading-tight">
              Find Your <span className="text-[#d4af37] font-medium">Dream Home</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-light leading-relaxed">
              Explore our exclusive collection of luxury properties crafted for the discerning few
            </p>
          </div>

          {/* Filter Section */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-12 animate-on-scroll delay-100 ${isInView ? 'visible' : ''}`}>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#1a1a2e] text-white shadow-lg shadow-[#1a1a2e]/20'
                      : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Configuration
                </label>
                <select
                  value={searchConfig}
                  onChange={(e) => setSearchConfig(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-gray-700"
                >
                  <option value="">All Configurations</option>
                  {configOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Price Range
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-gray-700"
                >
                  <option value="">All Prices</option>
                  {priceOptions.map(opt => (
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end justify-end">
                <button
                  onClick={() => {
                    setSearchConfig('')
                    setSearchPrice('')
                  }}
                  className="px-6 py-2.5 text-sm text-gray-400 hover:text-[#1a1a2e] hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {filteredProperties.length > 0 && (
              <div className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                Showing <span className="font-semibold text-[#1a1a2e]">{filteredProperties.length}</span> properties
                {searchConfig && <span className="ml-1">with <span className="font-semibold text-[#1a1a2e]">{searchConfig}</span> configuration</span>}
                {searchPrice && <span className="ml-1">in <span className="font-semibold text-[#1a1a2e]">{searchPrice}</span> range</span>}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProperties.map((property, idx) => (
                <div
                  key={property.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 animate-on-scroll ${isInView ? 'visible' : ''}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-gradient-to-r from-[#d4af37] to-[#b8942a] px-4 py-1.5 rounded-lg shadow-lg">
                        <span className="text-white font-bold text-sm">{property.price}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => openPropertyModal(property)} 
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    >
                      <span className="px-8 py-3.5 bg-white text-[#1a1a2e] rounded-full font-medium hover:bg-[#1a1a2e] hover:text-white transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0 shadow-xl flex items-center gap-2 text-sm">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>

                  <div className="p-5 bg-white">
                    <h3 className="text-lg font-serif font-medium text-[#1a1a2e] leading-tight group-hover:text-[#d4af37] transition-colors mb-1">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                      <span className="text-[#d4af37] font-bold text-sm">{property.price}</span>
                      <span className="text-xs text-gray-400">{property.config}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 bg-gray-50/80 rounded-lg border border-gray-100">
                        <div className="text-[#1a1a2e] font-semibold text-sm">{property.bedrooms} BHK</div>
                        <div className="text-[9px] text-gray-400 uppercase tracking-wider">Config</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50/80 rounded-lg border border-gray-100">
                        <div className="text-[#1a1a2e] font-semibold text-sm">{property.area}</div>
                        <div className="text-[9px] text-gray-400 uppercase tracking-wider">Area</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50/80 rounded-lg border border-gray-100">
                        <div className="text-[#1a1a2e] font-semibold text-sm">{property.units}</div>
                        <div className="text-[9px] text-gray-400 uppercase tracking-wider">Units</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{property.sqft} sq.ft</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => openPropertyModal(property)} 
                        className="py-2.5 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white text-xs font-medium rounded-xl hover:shadow-xl hover:shadow-[#1a1a2e]/20 transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
                      >
                        Book Site Visit
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => openPropertyModal(property)} 
                        className="py-2.5 bg-gray-50 hover:bg-gray-100 text-[#1a1a2e] text-xs font-medium rounded-xl border border-gray-200 transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif text-[#1a1a2e] mb-2">No Properties Found</h3>
              <p className="text-gray-500">Try adjusting your filters to find the perfect property</p>
              <button
                onClick={() => {
                  setSearchConfig('')
                  setSearchPrice('')
                }}
                className="mt-4 px-6 py-2 bg-[#1a1a2e] text-white rounded-full hover:bg-[#2d2d44] transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {hasMore && filteredProperties.length > 0 && (
            <div className={`text-center mt-14 animate-on-scroll delay-300 ${isInView ? 'visible' : ''}`}>
              <button
                onClick={handleViewMore}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all duration-300 font-medium text-sm"
              >
                <span>View More Properties</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fixed Modal - Always shows Send Enquiry button */}
      {selectedProperty && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePropertyModal()
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          
          <div className="relative w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[98vh] sm:max-h-[90vh] lg:max-h-[85vh]">
            {/* Close Button */}
            <button
              onClick={closePropertyModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-[#1a1a2e] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mobile Layout - Stacked */}
            <div className="flex flex-col lg:hidden max-h-[98vh]">
              {/* Image Section */}
              <div className="h-[280px] sm:h-[320px] relative bg-gray-900 flex-shrink-0">
                <img 
                  src={selectedProperty.images[currentImageIndex]} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {selectedProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-lg text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-lg text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {selectedProperty.images.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/40 w-2'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="bg-gradient-to-r from-[#d4af37] to-[#b8942a] px-3 py-1.5 rounded-lg shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm">{selectedProperty.price}</span>
                  </div>
                </div>
              </div>

              {/* Content Section - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1a1a2e] leading-tight">
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-center gap-1 text-gray-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{selectedProperty.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-center">
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Beds</div>
                      <div className="font-semibold text-[#1a1a2e] text-xs sm:text-sm">{selectedProperty.bedrooms} BHK</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-center">
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Baths</div>
                      <div className="font-semibold text-[#1a1a2e] text-xs sm:text-sm">{selectedProperty.bathrooms}</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-center">
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Area</div>
                      <div className="font-semibold text-[#1a1a2e] text-xs sm:text-sm">{selectedProperty.sqft}</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-center">
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Completion</div>
                      <div className="font-semibold text-[#1a1a2e] text-xs sm:text-sm">{selectedProperty.completion}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                    <p className="description-text text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedProperty.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 text-[10px] sm:text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                        <span className="whitespace-nowrap">{amenity}</span>
                      </div>
                    ))}
                    {selectedProperty.amenities.length > 6 && (
                      <span className="text-[10px] sm:text-xs text-gray-400 flex items-center px-2">
                        +{selectedProperty.amenities.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons - Always visible */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <button 
                      className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
                      onClick={handleCall}
                    >
                      <Phone className="w-4 h-4" />
                      Schedule a Visit
                    </button>
                    <button 
                      className="w-full py-2.5 sm:py-3 bg-[#1a1a2e] hover:bg-[#2d2d44] text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
                      onClick={() => {
                        setEnquiryProperty(selectedProperty.title)
                        setIsEnquiryModalOpen(true)
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Send Enquiry
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>100% Verified Properties</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>RERA Registered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Side by Side with all content visible */}
            <div className="hidden lg:flex h-[85vh]">
              {/* Left Side - Image Gallery */}
              <div className="w-[55%] h-full relative bg-gray-900">
                <img 
                  src={selectedProperty.images[currentImageIndex]} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                
                {selectedProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-lg text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-lg text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedProperty.images.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentImageIndex === idx ? 'bg-white w-8' : 'bg-white/40 w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side - Content with ALL elements visible */}
              <div className="w-[45%] h-full overflow-hidden p-6 bg-white flex flex-col">
                {/* Title & Location - Fixed */}
                <div className="flex-shrink-0">
                  <h2 className="text-2xl font-serif font-bold text-[#1a1a2e] leading-tight">
                    {selectedProperty.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <span className="text-sm">{selectedProperty.location}</span>
                  </div>
                </div>

                {/* Price - Fixed */}
                <div className="flex-shrink-0 mt-3">
                  <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#b8942a]/10 px-4 py-2 rounded-xl border border-[#d4af37]/20">
                    <span className="text-xl font-bold text-[#d4af37]">{selectedProperty.price}</span>
                  </div>
                </div>

                {/* Quick Specs - Fixed */}
                <div className="flex-shrink-0 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Bedrooms</div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">{selectedProperty.bedrooms} BHK</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Bathrooms</div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">{selectedProperty.bathrooms}</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Area</div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">{selectedProperty.sqft} sq.ft</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Completion</div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">{selectedProperty.completion}</div>
                    </div>
                  </div>
                </div>

                {/* Description - Fixed with limited height */}
                <div className="flex-shrink-0 mt-3">
                  <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <p className="description-text text-gray-700 text-sm leading-relaxed line-clamp-2">
                      {selectedProperty.description}
                    </p>
                  </div>
                </div>

                {/* Amenities - Fixed with grid */}
                <div className="flex-shrink-0 mt-3">
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedProperty.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {selectedProperty.amenities.length > 6 && (
                    <p className="text-[10px] text-gray-400 mt-1">+{selectedProperty.amenities.length - 6} more amenities</p>
                  )}
                </div>

                {/* CTA Buttons - ALWAYS VISIBLE at bottom */}
                <div className="flex-shrink-0 mt-auto pt-3 border-t border-gray-100">
                  <div className="space-y-2">
                    <button 
                      className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      onClick={handleCall}
                    >
                      <Phone className="w-4 h-4" />
                      Schedule a Site Visit
                    </button>
                    <button 
                      className="w-full py-2.5 bg-[#1a1a2e] hover:bg-[#2d2d44] text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      onClick={() => {
                        setEnquiryProperty(selectedProperty.title)
                        setIsEnquiryModalOpen(true)
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Send Enquiry
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                      <Shield className="w-3.5 h-3.5" />
                      <span>100% Verified Properties</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>RERA Registered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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