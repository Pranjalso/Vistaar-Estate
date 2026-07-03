"use client";

import { useState, useEffect } from "react";
import { ClipboardEdit, PhoneCall, X, Send, AlertCircle, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const FloatingContact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isFormOpen) {
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
      setTouched({});
      setIsSuccess(false);
      setError("");
    }
  }, [isFormOpen]);

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return ""; // optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Phone number is required";
    const cleanedPhone = phone.replace(/\D/g, "");
    // Indian phone number: exactly 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (cleanedPhone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (!phoneRegex.test(cleanedPhone)) {
      return "Please enter a valid Indian phone number starting with 6-9";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      let err = "";
      if (name === "name") err = validateName(value);
      if (name === "email") err = validateEmail(value);
      if (name === "phone") err = validatePhone(value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    let err = "";
    if (name === "name") err = validateName(value);
    if (name === "email") err = validateEmail(value);
    if (name === "phone") err = validatePhone(value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
    });
    
    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;
    
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

  const isFormValid = 
    !errors.name && 
    !errors.email && 
    !errors.phone && 
    formData.name.trim() && 
    formData.phone.trim();

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
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Thank You!</h3>
                  <p className="text-sm text-gray-500 mt-1">We'll contact you soon.</p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm ${
                        touched.name && errors.name 
                          ? "border-red-300 focus:ring-red-300" 
                          : "border-gray-200"
                      }`}
                      placeholder="John Doe"
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm ${
                        touched.email && errors.email 
                          ? "border-red-300 focus:ring-red-300" 
                          : "border-gray-200"
                      }`}
                      placeholder="john@example.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm ${
                        touched.phone && errors.phone 
                          ? "border-red-300 focus:ring-red-300" 
                          : "border-gray-200"
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full py-3.5 mt-2 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting || !isFormValid 
                        ? "opacity-50 cursor-not-allowed" 
                        : "hover:shadow-lg hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
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
