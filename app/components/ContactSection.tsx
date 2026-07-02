'use client'

import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Check, X } from 'lucide-react'
import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setIsSuccess(false)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          ...formData
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="section-padding bg-white" id="contact">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1 bg-[#d4af37]/10 text-[#d4af37] text-sm uppercase tracking-widest rounded-full mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#1a1a2e] mb-4">
            Get In <span className="text-[#d4af37]">Touch</span>
          </h2>
          <p className="text-[#2d2d44]">
            Our team of experts is here to help you find your dream property
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-4 animate-on-scroll fade-left ${isInView ? 'visible' : ''}`}>
            {[
              { icon: MapPin, title: 'Visit Us', details: ['123 Luxury Avenue', 'Mumbai, India 400001'] },
              { icon: Phone, title: 'Call Us', details: ['+91 9999999999', '+91 8888888888'] },
              { icon: Mail, title: 'Email Us', details: ['info@vistaarestate.com'] },
              { icon: Clock, title: 'Working Hours', details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat: 10:00 AM - 6:00 PM'] }
            ].map((info, idx) => (
              <div key={idx} className="bg-[#f5efe6] p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#1a1a2e] mb-1">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-[#2d2d44] text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 animate-on-scroll fade-right delay-100 ${isInView ? 'visible' : ''}`}>
            <div className="bg-[#f5efe6] p-8 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] mb-6">
                Send Us a <span className="text-[#d4af37]">Message</span>
              </h3>

              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-serif font-semibold text-[#1a1a2e] mb-2">Thank You!</h4>
                  <p className="text-gray-600">Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-200">
                      <X className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
                      placeholder="+91 99999 99999"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] transition-colors bg-white resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#d4af37] text-white rounded-xl hover:bg-[#b8942a] transition-colors duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
