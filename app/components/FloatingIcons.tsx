"use client";

import { useState, useEffect } from "react";
import { ClipboardEdit, PhoneCall, X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingContact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      label: "Enquiry",
      action: "form",
      icon: <ClipboardEdit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />,
    },
    {
      label: "Call Us",
      href: "tel:+919999999999",
      icon: <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919999999999",
      target: "_blank",
      icon: <FaWhatsapp className="text-white text-sm sm:text-base" />,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 2000);
    }, 1500);
  };

  const handleIconClick = (item: typeof items[0]) => {
    if (item.action === "form") {
      setIsFormOpen(true);
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <>
      {/* CSS for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          
          .floating-icons-container:hover .animate-float-1 {
            animation: float 3s ease-in-out infinite;
            animation-delay: 0.2s;
          }

          .floating-icons-container:hover .animate-float-2 {
            animation: float 3.5s ease-in-out infinite;
            animation-delay: 0.5s;
          }

          .floating-icons-container:hover .animate-float-3 {
            animation: float 4s ease-in-out infinite;
            animation-delay: 0.8s;
          }

          .floating-icons-container .animate-float-1,
          .floating-icons-container .animate-float-2,
          .floating-icons-container .animate-float-3 {
            animation: none;
          }
        `}
      </style>

      {/* Desktop Floating Icons - Golden Theme */}
      <div 
        className={`hidden sm:block fixed right-0 top-1/2 -translate-y-1/2 z-[9999] transition-all duration-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
        }`}
      >
        <div className="relative floating-icons-container">
          {/* Main Container - Golden Gradient */}
          <div className="bg-gradient-to-b from-[#d4af37] to-[#b8942a] rounded-l-2xl py-2.5 px-2 shadow-2xl shadow-[#d4af37]/30 border border-white/20 flex flex-col items-center gap-2.5">
            
            {/* Decorative Line - Top */}
            <div className="w-5 h-0.5 bg-white/30 rounded-full" />
            
            {items.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleIconClick(item)}
                className={`group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a2e]/90 hover:bg-[#1a1a2e] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95 border border-white/10 ${
                  index === 0 ? 'animate-float-1' : 
                  index === 1 ? 'animate-float-2' : 
                  'animate-float-3'
                }`}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Icon */}
                <div className="relative z-10">
                  {item.icon}
                </div>

                {/* Tooltip */}
                <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1a1a2e] text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-lg">
                  {item.label}
                </span>
              </button>
            ))}

            {/* Decorative Line - Bottom */}
            <div className="w-5 h-0.5 bg-white/30 rounded-full" />
          </div>

          {/* Pulse Ring Animation */}
          <div className="absolute -inset-1 rounded-l-2xl border-2 border-[#d4af37]/20 animate-pulse" />
        </div>
      </div>

      {/* Mobile Bottom Bar - Only Call Us and Enquiry */}
      <div 
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-[#d4af37] to-[#b8942a] px-4 py-3 shadow-2xl shadow-[#d4af37]/30">
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            {/* Enquiry Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e]/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-[#1a1a2e] hover:scale-105 active:scale-95 shadow-lg"
            >
              <ClipboardEdit className="w-4 h-4" />
              Enquiry
            </button>

            {/* Call Button */}
            <a
              href="tel:+919999999999"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e]/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-[#1a1a2e] hover:scale-105 active:scale-95 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFormOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Gold Top Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]" />
            
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <ClipboardEdit className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1a1a2e]">Enquiry Form</h2>
                    <p className="text-xs text-gray-500">We'll get back to you shortly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Thank You!</h3>
                  <p className="text-sm text-gray-500 mt-1">We'll contact you soon.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </>
              )}
            </form>

            <div className="px-6 pb-4 text-center">
              <p className="text-[10px] text-gray-400">We respect your privacy. Your information is safe with us.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;