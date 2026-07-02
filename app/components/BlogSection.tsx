'use client'

import { Calendar, User, ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const BlogSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const posts = [
    {
      id: 1,
      title: 'Top 10 Luxury Real Estate Trends in 2024',
      excerpt: 'Discover the latest trends shaping the luxury real estate market.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      date: 'June 15, 2024',
      author: 'Arjun Mehta',
      category: 'Market Trends'
    },
    {
      id: 2,
      title: 'Why Invest in Farmlands? A Comprehensive Guide',
      excerpt: 'Learn about the benefits of investing in farmlands.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
      date: 'June 10, 2024',
      author: 'Priya Sharma',
      category: 'Investment'
    },
    {
      id: 3,
      title: 'The Rise of Gated Communities in India',
      excerpt: 'Explore why gated communities are becoming increasingly popular.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      date: 'June 5, 2024',
      author: 'Vikram Singh',
      category: 'Community Living'
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-white" id="blog">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1 bg-[#d4af37]/10 text-[#d4af37] text-sm uppercase tracking-widest rounded-full mb-4">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#1a1a2e] mb-4">
            Insights & <span className="text-[#d4af37]">Updates</span>
          </h2>
          <p className="text-[#2d2d44]">
            Stay informed with the latest news and trends from the world of luxury real estate
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div 
              key={post.id} 
              className={`group bg-[#f5efe6] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#d4af37] text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1a1a2e] mb-2">
                  {post.title}
                </h3>
                <p className="text-[#2d2d44] text-sm mb-4">
                  {post.excerpt}
                </p>

                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="inline-flex items-center gap-2 text-[#d4af37] font-medium hover:text-[#b8942a] transition-colors group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-10 animate-on-scroll delay-300 ${isInView ? 'visible' : ''}`}>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b8942a] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
