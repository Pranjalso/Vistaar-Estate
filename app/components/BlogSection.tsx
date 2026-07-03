'use client'

import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { useInView } from '../hooks/useInView'
import { blogPosts } from '@/lib/blogData'

const BlogSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  const posts = blogPosts.slice(0, 3)

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-[#f8f5f0] to-white" id="blog">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs uppercase tracking-[0.3em] rounded-full mb-4 border border-[#d4af37]/20">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a1a2e] mb-4">
            Insights & <span className="text-[#d4af37] font-medium">Updates</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Stay informed with the latest news, trends, and insights from the world of luxury real estate
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 animate-on-scroll ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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

        {/* View All Button */}
        <div className={`text-center mt-12 animate-on-scroll delay-200 ${isInView ? 'visible' : ''}`}>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all duration-300 font-medium text-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection