'use client'

import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['123 Luxury Avenue', 'Mumbai, India 400001'] },
    { icon: Phone, title: 'Call Us', details: ['+91 9999999999', '+91 8888888888'] },
    { icon: Mail, title: 'Email Us', details: ['info@vistaarestate.com'] },
    { icon: Clock, title: 'Working Hours', details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat: 10:00 AM - 6:00 PM'] }
  ]

  return (
    <main className="pt-20 bg-[#f8f5f0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs uppercase tracking-widest rounded-full mb-4">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-light text-[#1a1a2e] mb-4">
            Get In <span className="text-[#d4af37] font-medium">Touch</span>
          </h1>
          <p className="text-gray-500 font-light">Our team is here to help you find your dream property</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-[#1a1a2e] text-sm">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-500 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Contact CTA */}
            <div className="bg-[#1a1a2e] p-5 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif font-medium">Quick Response</h3>
              </div>
              <p className="text-sm text-gray-400 font-light mb-3">We respond within 2 hours during business hours</p>
              <div className="flex gap-3">
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center">
                  WhatsApp
                </a>
                <a href="tel:+919999999999" className="flex-1 px-4 py-2 bg-[#d4af37] text-white rounded-lg text-sm font-medium hover:bg-[#b8942a] transition-colors text-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif font-light text-[#1a1a2e] mb-6">
                Send Us a <span className="text-[#d4af37] font-medium">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm"
                    placeholder="+91 99999 99999"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] transition-all outline-none text-sm resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#1a1a2e] text-white rounded-lg hover:bg-[#2d2d44] transition-colors duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-gray-200 rounded-xl overflow-hidden h-64">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792263516875!2d72.82978631489327!3d19.07577368707773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e8a1d6d4d9%3A0x9b5c9e8a1d6d4d9!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1644838180512"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </main>
  )
}