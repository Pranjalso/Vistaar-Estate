'use client'

import Image from 'next/image'
import { 
  MapPin, Phone, Mail, Shield, Award, Users, Clock, ChevronRight
} from 'lucide-react'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube 
} from 'react-icons/fa'

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Properties', id: 'properties' },
    { name: 'Blog', id: 'blog' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ]

  const contactInfo = [
    { icon: MapPin, text: '123 Luxury Avenue, Mumbai, India' },
    { icon: Phone, text: '+91 9999999999' },
    { icon: Mail, text: 'info@vistaarestate.com' }
  ]

  const socialIcons = [
    { icon: FaFacebook, href: '#' },
    { icon: FaInstagram, href: '#' },
    { icon: FaTwitter, href: '#' },
    { icon: FaYoutube, href: '#' }
  ]

  return (
    <footer className="bg-[#e8e3dc] border-t border-gray-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <button onClick={() => scrollToSection('hero')} className="block">
              <div className="relative w-[180px] h-[55px] sm:w-[200px] sm:h-[60px]">
                <Image
                  src="/logo.png"
                  alt="Vistaar Estate"
                  fill
                  sizes="(max-width: 640px) 180px, 200px"
                  className="object-contain"
                  priority
                />
              </div>
            </button>
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              Crafting premium living spaces for those who appreciate the finer things in life.
            </p>
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-400 hover:border-[#d4af37] flex items-center justify-center text-gray-600 hover:text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37]/10 hover:scale-110 hover:shadow-md"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#d4af37] transition-colors duration-300 text-sm group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm group">
                  <item.icon className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="group-hover:text-[#1a1a2e] transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider mb-5">
              Business Hours
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between hover:text-[#1a1a2e] transition-colors">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between hover:text-[#1a1a2e] transition-colors">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between hover:text-[#1a1a2e] transition-colors">
                <span>Sunday</span>
                <span className="text-[#d4af37] font-medium">Closed</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-300/30">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1a1a2e] transition-colors">
                  <Shield className="w-4 h-4 text-[#d4af37]" />
                  <span>100% Verified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1a1a2e] transition-colors">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1a1a2e] transition-colors">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  <span>500+ Clients</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1a1a2e] transition-colors">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>10+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-300/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} <span className="text-[#d4af37] font-medium">VISTAAR ESTATE</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="hover:text-[#d4af37] transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="hover:text-[#d4af37] transition-colors duration-300">
                Terms of Service
              </button>
              <button className="hover:text-[#d4af37] transition-colors duration-300">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
