'use client'

import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
          <div className="lg:col-span-1 space-y-4">
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
          <div className="lg:col-span-2">
            <div className="bg-[#f5efe6] p-8 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] mb-6">
                Send Us a <span className="text-[#d4af37]">Message</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
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
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors bg-white"
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
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors bg-white resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8942a] transition-colors duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection