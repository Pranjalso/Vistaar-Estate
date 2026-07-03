'use client'

import { Calendar, User, ArrowRight, Clock, Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { blogPosts, getAllCategories } from '@/lib/blogData'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visiblePosts, setVisiblePosts] = useState(6)

  const posts = blogPosts
  const categories = getAllCategories()

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const displayedPosts = filteredPosts.slice(0, visiblePosts)
  const hasMore = visiblePosts < filteredPosts.length

  return (
    <main className="pt-28 pb-16 bg-gradient-to-b from-[#f8f5f0] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs uppercase tracking-[0.3em] rounded-full mb-4 border border-[#d4af37]/20">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#1a1a2e] mb-4 leading-tight">
            Insights & <span className="text-[#d4af37] font-medium">Updates</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg font-light leading-relaxed">
            Stay informed with the latest news, trends, and insights from the world of luxury real estate
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all outline-none text-sm text-gray-700"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#1a1a2e] text-white shadow-lg shadow-[#1a1a2e]/20'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results Count */}
          {filteredPosts.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
              Showing <span className="font-semibold text-[#1a1a2e]">{filteredPosts.length}</span> articles
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map((post) => (
                <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50">
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#d4af37] text-white text-xs font-medium rounded-lg shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#1a1a2e] text-xs font-medium rounded-lg shadow-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#d4af37]" />
                        {post.author}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#1a1a2e] mb-2 group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#d4af37] font-medium hover:text-[#b8942a] transition-colors duration-300 group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length))}
                  className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[#d4af37] text-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-white transition-all duration-300 font-medium text-sm group"
                >
                  Load More Articles
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif text-[#1a1a2e] mb-2">No Articles Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-4 px-6 py-2 bg-[#1a1a2e] text-white rounded-full hover:bg-[#2d2d44] transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}