'use client'

import { MapPin, Bed, Bath, Square, Heart, Eye, Search, ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const PropertyCards = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchConfig, setSearchConfig] = useState('')
  const [searchPrice, setSearchPrice] = useState('')
  const [visibleCards, setVisibleCards] = useState(3)

  const properties = [
    {
      id: 1,
      title: 'Vistaar Holachennai',
      price: '₹99 L - ₹3.21 Cr',
      location: 'Sholinganallur, Chennai',
      area: '30 Acres',
      units: '1818 Units',
      config: '2, 3 & 4 BHK Apts, 5 BHK Floor Villa & Villa',
      configShort: '2, 3 & 4 BHK Apts',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      status: 'Available',
      type: 'luxury',
      badge: 'Premium',
      bathrooms: 3,
      bedrooms: 3,
      sqft: '1850'
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
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      status: 'Available',
      type: 'luxury',
      badge: 'Featured',
      bathrooms: 4,
      bedrooms: 4,
      sqft: '2400'
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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      status: 'Available',
      type: 'premium',
      badge: 'Popular',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '1200'
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
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
      status: 'Coming Soon',
      type: 'luxury',
      badge: 'New Launch',
      bathrooms: 3,
      bedrooms: 3,
      sqft: '2000'
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
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      status: 'Available',
      type: 'premium',
      badge: 'Premium',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '1450'
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
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
      status: 'Available',
      type: 'affordable',
      badge: 'Value',
      bathrooms: 2,
      bedrooms: 2,
      sqft: '950'
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Properties' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'premium', label: 'Premium' },
    { id: 'affordable', label: 'Affordable' },
  ]

  const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa', 'Penthouse']
  const priceOptions = ['Below ₹50 L', '₹50 L - ₹1 Cr', '₹1 Cr - ₹2 Cr', '₹2 Cr - ₹3 Cr', 'Above ₹3 Cr']

  const filteredProperties = properties.filter(p => {
    const matchTab = activeTab === 'all' || p.type === activeTab
    const matchConfig = searchConfig === '' || p.config.includes(searchConfig.replace(' BHK', ''))
    const matchPrice = searchPrice === '' || true
    return matchTab && matchConfig && matchPrice
  })

  const displayedProperties = filteredProperties.slice(0, visibleCards)
  const hasMore = visibleCards < filteredProperties.length

  const handleViewMore = () => {
    setVisibleCards(prev => Math.min(prev + 3, filteredProperties.length))
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full mb-4 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Collection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#1a1a2e] mb-4">
            A Place That You <span className="text-[#d4af37] font-medium">Call Home</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-light">
            Discover our curated collection of premium properties designed for the discerning few
          </p>
        </div>

        {/* Filter Section - Always Visible */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#1a1a2e] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                Configuration
              </label>
              <select
                value={searchConfig}
                onChange={(e) => setSearchConfig(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm text-gray-700"
              >
                <option value="">All Configurations</option>
                {configOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                Price Range
              </label>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm text-gray-700"
              >
                <option value="">All Prices</option>
                {priceOptions.map(opt => (
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProperties.map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    property.status === 'Available' 
                      ? 'bg-[#1a1a2e] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {property.status}
                  </span>
                  <span className="px-3 py-1 bg-[#d4af37] text-white text-xs font-medium rounded-full">
                    {property.badge}
                  </span>
                </div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#1a1a2e] hover:text-white transition-colors duration-300 shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Overlay */}
                <Link href={`/property/${property.id}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="px-6 py-2.5 bg-white text-[#1a1a2e] rounded-full font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors duration-300 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-sm flex items-center gap-2">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-serif font-medium text-[#1a1a2e] leading-tight">
                    {property.title}
                  </h3>
                  <span className="text-[#d4af37] font-medium text-sm whitespace-nowrap">
                    {property.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Property Specs */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50/80 rounded-lg">
                  <div className="text-center">
                    <div className="text-[#1a1a2e] font-medium text-sm">{property.bedrooms}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Beds</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-[#1a1a2e] font-medium text-sm">{property.bathrooms}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Baths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#1a1a2e] font-medium text-sm">{property.sqft}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Sq.Ft</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate max-w-[120px]">
                    {property.configShort}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {property.area}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {property.units}
                  </span>
                </div>

                {/* CTA Button */}
                <Link href={`/property/${property.id}`}>
                  <button className="w-full py-2.5 bg-[#1a1a2e] text-white text-sm font-medium rounded-lg hover:bg-[#2d2d44] transition-colors duration-300 hover:shadow-md flex items-center justify-center gap-2">
                    Book a Site Visit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
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
    </section>
  )
}

export default PropertyCards