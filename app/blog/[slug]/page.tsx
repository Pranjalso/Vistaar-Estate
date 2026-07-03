'use client'

import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { useState } from 'react'
import { getPostBySlug, getRelatedPosts } from '@/lib/blogData'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const post = getPostBySlug(slug)
  const relatedPosts = getRelatedPosts(slug)
  const [copied, setCopied] = useState(false)

  if (!post) {
    notFound()
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  // Get short content - safely without document.createElement
  const getShortContent = (html: string) => {
    // Simple approach - get first few paragraphs by splitting
    const paragraphs = html.split('</p>')
    let shortHtml = ''
    let count = 0
    
    for (const para of paragraphs) {
      if (count < 3 && para.trim()) {
        shortHtml += para + '</p>'
        count++
      } else {
        break
      }
    }
    
    // If no paragraphs found, just take first 300 characters
    if (!shortHtml) {
      return html.substring(0, 300) + '...'
    }
    
    return shortHtml
  }

  const shortContent = getShortContent(post.content)

  // Fallback image if image is missing
  const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'

  return (
    <main className="pt-20 pb-12 bg-gradient-to-b from-[#f8f5f0] to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#b8942a] transition-colors duration-300 text-sm font-medium group mb-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Article Card */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100/50">
          {/* Image Section */}
          <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-[#d4af37]/10 to-[#b8942a]/10">
            <img
              src={post.image || fallbackImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = fallbackImage
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#d4af37] text-white text-xs font-medium rounded-full shadow-lg">
                {post.category}
              </span>
            </div>

            {/* Meta Info */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3 text-white/90 text-xs">
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-7">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1a1a2e] mb-3 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8942a] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#d4af37]/20">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm">{post.author}</p>
                  <p className="text-xs text-gray-400">Real Estate Expert</p>
                </div>
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 rounded-full transition-all duration-300 text-xs font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            {/* Content - Short & Clean */}
            <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#1a1a2e] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#1a1a2e] prose-ul:text-gray-600 prose-li:text-gray-600">
              <div dangerouslySetInnerHTML={{ __html: shortContent }} />
            </div>

            {/* Read More Link */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link 
                href="/blog" 
                className="text-sm text-[#d4af37] font-medium hover:underline inline-flex items-center gap-1"
              >
                Read full article on our blog →
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts - Fixed Display */}
        {relatedPosts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base font-serif font-bold text-[#1a1a2e] mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#d4af37] rounded-full"></span>
              Related Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/50"
                >
                  <div className="relative h-28 overflow-hidden bg-gray-100">
                    <img
                      src={relatedPost.image || fallbackImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = fallbackImage
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-[#d4af37] text-white text-[8px] font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-serif font-semibold text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {relatedPost.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#d4af37]/5 to-[#b8942a]/5 border border-[#d4af37]/10 text-center">
          <p className="text-xs text-gray-500">
            Want more insights? <Link href="/blog" className="text-[#d4af37] font-medium hover:underline">Browse all articles →</Link>
          </p>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .prose h2 {
          font-size: 1.1rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
        }
        .prose h3 {
          font-size: 1rem;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
        }
        .prose p {
          margin-bottom: 0.6rem;
          color: #4a4a5a;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .prose ul {
          margin: 0.5rem 0;
          padding-left: 1.25rem;
        }
        .prose li {
          margin-bottom: 0.2rem;
          color: #4a4a5a;
          font-size: 0.9rem;
        }
        .prose strong {
          color: #1a1a2e;
          font-weight: 600;
        }
        .prose blockquote {
          border-left: 3px solid #d4af37;
          background: rgba(212, 175, 55, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 0.75rem 0;
          font-style: italic;
          color: #1a1a2e;
          font-size: 0.9rem;
        }
        .prose blockquote p {
          margin-bottom: 0;
        }
        @media (min-width: 640px) {
          .prose h2 {
            font-size: 1.25rem;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
          .prose h3 {
            font-size: 1.1rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .prose p {
            font-size: 0.95rem;
            margin-bottom: 0.75rem;
          }
          .prose li {
            font-size: 0.95rem;
          }
          .prose blockquote {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  )
}