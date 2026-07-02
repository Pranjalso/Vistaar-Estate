"use client";

import { useState } from "react";
import { ClipboardEdit, PhoneCall, X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingContact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "enquiry",
          ...formData
        })
      });
      if (!response.ok) throw new Error("Failed to submit enquiry");
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnquiryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "tel:+919999999999";
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open("https://wa.me/919999999999", "_blank", "noopener,noreferrer");
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

          .floating-icon-button {
            transition: all 0.3s ease;
          }

          .floating-icon-button:hover {
            transform: scale(1.1);
          }
        `}
      </style>

      {/* Desktop Floating Icons - Golden Theme */}
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative floating-icons-container">
          {/* Main Container - Golden Gradient */}
          <div className="bg-gradient-to-b from-[#d4af37] to-[#b8942a] rounded-l-2xl py-2.5 px-2 shadow-2xl shadow-[#d4af37]/30 border border-white/20 flex flex-col items-center gap-2.5">
            
            {/* Decorative Line - Top */}
            <div className="w-5 h-0.5 bg-white/30 rounded-full" />
            
            {/* Enquiry Icon - Opens Form */}
            <button
              onClick={handleEnquiryClick}
              className="floating-icon-button group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a2e]/90 hover:bg-[#1a1a2e] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95 border border-white/10 animate-float-1"
              aria-label="Enquiry"
            >
              <div className="relative z-10">
                <ClipboardEdit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1a1a2e] text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg">
                Enquiry
              </span>
            </button>

            {/* Call Icon - Makes Phone Call */}
            <button
              onClick={handleCallClick}
              className="floating-icon-button group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a2e]/90 hover:bg-[#1a1a2e] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95 border border-white/10 animate-float-2"
              aria-label="Call Us"
            >
              <div className="relative z-10">
                <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1a1a2e] text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg">
                Call Us
              </span>
            </button>

            {/* WhatsApp Icon - Opens WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="floating-icon-button group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a2e]/90 hover:bg-[#1a1a2e] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95 border border-white/10 animate-float-3"
              aria-label="WhatsApp"
            >
              <div className="relative z-10">
                <FaWhatsapp className="text-white text-sm sm:text-base" />
              </div>
              <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1a1a2e] text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg">
                WhatsApp
              </span>
            </button>

            {/* Decorative Line - Bottom */}
            <div className="w-5 h-0.5 bg-white/30 rounded-full" />
          </div>

          {/* Pulse Ring Animation */}
          <div className="absolute -inset-1 rounded-l-2xl border-2 border-[#d4af37]/20 animate-pulse pointer-events-none" />
        </div>
      </div>

      {/* Mobile Bottom Bar - Fixed */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999]">
        <div className="bg-gradient-to-r from-[#d4af37] to-[#b8942a] px-4 py-3 shadow-2xl shadow-[#d4af37]/30">
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            {/* Enquiry Button */}
            <button
              type="button"
              onClick={handleEnquiryClick}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e]/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-[#1a1a2e] hover:scale-105 active:scale-95 shadow-lg"
            >
              <ClipboardEdit className="w-4 h-4" />
              Enquiry
            </button>

            {/* Call Button */}
            <button
              type="button"
              onClick={handleCallClick}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e]/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-[#1a1a2e] hover:scale-105 active:scale-95 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              Call Us
            </button>
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
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
                  type="button"
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
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}
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
                    <label className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
