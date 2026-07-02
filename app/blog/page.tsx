'use client'

import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Luxury Real Estate Trends in 2024',
      excerpt: 'Discover the latest trends shaping the luxury real estate market, from smart homes to sustainable living.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      date: 'June 15, 2024',
      author: 'Arjun Mehta',
      category: 'Market Trends',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Why Invest in Farmlands? A Comprehensive Guide',
      excerpt: 'Learn about the benefits of investing in farmlands and how they can be a valuable addition to your portfolio.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
      date: 'June 10, 2024',
      author: 'Priya Sharma',
      category: 'Investment',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Rise of Gated Communities in India',
      excerpt: 'Explore why gated communities are becoming increasingly popular among homebuyers in urban areas.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      date: 'June 5, 2024',
      author: 'Vikram Singh',
      category: 'Community Living',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Sustainable Architecture: Building for the Future',
      excerpt: 'How modern architecture is embracing sustainability and eco-friendly design principles.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      date: 'May 28, 2024',
      author: 'Ananya Reddy',
      category: 'Architecture',
      readTime: '4 min read'
    },
    {
      id: 5,
      title: '5 Tips for First-Time Home Buyers',
      excerpt: 'Essential advice for first-time homebuyers to make informed decisions and avoid common pitfalls.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
      date: 'May 20, 2024',
      author: 'Suresh Kumar',
      category: 'Buying Tips',
      readTime: '8 min read'
    },
    {
      id: 6,
      title: 'Luxury Amenities That Redefine Modern Living',
      excerpt: 'From infinity pools to smart home automation, discover the amenities that make a property truly luxurious.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      date: 'May 15, 2024',
      author: 'Priya Sharma',
      category: 'Amenities',
      readTime: '5 min read'
    }
  ]

  return (
    <main className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-sm uppercase tracking-widest rounded-full mb-4">
            Our Blog
          </span>
          <h1 className="heading-primary mb-4">
            Insights & <span className="text-gold">Updates</span>
          </h1>
          <p className="text-body">
            Stay informed with the latest news, trends, and insights from the world of luxury real estate
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="px-3 py-1 bg-gold/10 text-gold rounded-full">
                    {posts[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {posts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {posts[0].author}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-3">
                  {posts[0].title}
                </h2>
                <p className="text-body text-sm mb-4">
                  {posts[0].excerpt}
                </p>
                <Link 
                  href={`/blog/${posts[0].id}`}
                  className="inline-flex items-center gap-2 text-gold font-medium hover:text-gold-dark transition-colors duration-300 group"
                >
                  Read More 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-gold text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
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

                <h3 className="text-lg font-serif font-bold text-primary mb-2">
                  {post.title}
                </h3>
                <p className="text-body text-sm mb-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {post.readTime}
                  </span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:text-gold-dark transition-colors duration-300 group"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-12 py-4 border-2 border-gold text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 font-medium">
            Load More Articles
          </button>
        </div>
      </div>
    </main>
  )
}