"use client";

import { useState, useEffect } from "react";
import { ClipboardEdit, X, Send, AlertCircle, Check, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const FloatingContact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isFormOpen) {
      setFormData({ name: "", email: "", phone: "", message: "" });
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
    const phoneRegex = /^[6-9]\d{9}$/;
    if (cleanedPhone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (!phoneRegex.test(cleanedPhone)) {
      return "Please enter a valid Indian phone number starting with 6-9";
    }
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      let err = "";
      if (name === "name") err = validateName(value);
      if (name === "email") err = validateEmail(value);
      if (name === "phone") err = validatePhone(value);
      if (name === "message") err = validateMessage(value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    let err = "";
    if (name === "name") err = validateName(value);
    if (name === "email") err = validateEmail(value);
    if (name === "phone") err = validatePhone(value);
    if (name === "message") err = validateMessage(value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
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
      setFormData({ name: "", email: "", phone: "", message: "" });
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
    !errors.message &&
    formData.name.trim() && 
    formData.phone.trim() &&
    formData.message.trim();

  const handleEnquiryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open("https://wa.me/919999999999", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }

          @keyframes breathe-whatsapp {
            0%, 100% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.15); }
            50% { box-shadow: 0 0 35px rgba(37, 211, 102, 0.3); }
          }

          @keyframes breathe-enquiry {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.15); }
            50% { box-shadow: 0 0 35px rgba(212, 175, 55, 0.3); }
          }

          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.4; }
            100% { transform: scale(2); opacity: 0; }
          }

          @keyframes formSlideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes formSlideDown {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(40px) scale(0.95); }
          }

          @keyframes staggerItem {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .floating-button {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: visible;
          }

          .floating-button:hover {
            transform: scale(1.08) translateY(-2px);
          }

          .floating-button:active {
            transform: scale(0.95);
          }

          .floating-button .icon-wrapper {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .floating-button:hover .icon-wrapper {
            transform: scale(1.05);
          }

          .floating-button-whatsapp {
            animation: float 3s ease-in-out infinite;
            background: linear-gradient(135deg, #25D366, #128C7E);
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);
          }

          .floating-button-whatsapp:hover {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          }

          .floating-button-whatsapp .ripple-effect {
            animation: breathe-whatsapp 3s ease-in-out infinite;
          }

          .floating-button-enquiry {
            animation: float 3.5s ease-in-out infinite;
            animation-delay: 0.3s;
            background: linear-gradient(135deg, #d4af37, #b8942a);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
          }

          .floating-button-enquiry:hover {
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
          }

          .floating-button-enquiry .ripple-effect {
            animation: breathe-enquiry 3.5s ease-in-out infinite;
          }

          .floating-button .ripple-effect {
            position: absolute;
            inset: -3px;
            border-radius: 50%;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            pointer-events: none;
          }

          .floating-button::after {
            content: '';
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            background: transparent;
            pointer-events: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .floating-button:active::after {
            animation: ripple 0.6s ease-out forwards;
          }

          .form-animate-in {
            animation: formSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .form-animate-out {
            animation: formSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .stagger-item {
            opacity: 0;
            animation: staggerItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .stagger-item-1 { animation-delay: 0.05s; }
          .stagger-item-2 { animation-delay: 0.1s; }
          .stagger-item-3 { animation-delay: 0.15s; }
          .stagger-item-4 { animation-delay: 0.2s; }
          .stagger-item-5 { animation-delay: 0.25s; }

          @media (max-width: 1023px) {
            .floating-button-whatsapp {
              animation: float 2.5s ease-in-out infinite;
            }
            .floating-button-enquiry {
              animation: float 3s ease-in-out infinite;
              animation-delay: 0.2s;
            }
          }
        `}
      </style>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-[9999] flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleWhatsAppClick}
          className="floating-button floating-button-whatsapp group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-[46px] md:h-[46px] rounded-full shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="WhatsApp"
        >
          <div className="ripple-effect" />
          <div className="icon-wrapper relative z-10">
            <FaWhatsapp className="text-white text-base sm:text-lg" />
          </div>
        </button>

        <button
          onClick={handleEnquiryClick}
          className="floating-button floating-button-enquiry group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-[46px] md:h-[46px] rounded-full shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Enquiry"
        >
          <div className="ripple-effect" />
          <div className="icon-wrapper relative z-10">
            <ClipboardEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a2e]" />
          </div>
        </button>
      </div>

      {/* Premium Enquiry Form */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFormOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-[#0f0f1a]/60 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden form-animate-in">
            {/* Gold Top Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]" />
            
            {/* Header */}
            <div className="px-8 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 stagger-item stagger-item-1">
                  <div className="w-11 h-11 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <ClipboardEdit className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#1a1a2e]">Enquire Now</h2>
                    <p className="text-sm text-gray-400 font-light">We'll respond within 24 hours</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center flex-shrink-0 stagger-item stagger-item-1"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
              {isSuccess ? (
                <div className="text-center py-8 stagger-item stagger-item-1">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">Thank You!</h3>
                  <p className="text-sm text-gray-400 mt-1">We'll contact you soon.</p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2 stagger-item stagger-item-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                  
                  {/* Name Field */}
                  <div className="space-y-1.5 stagger-item stagger-item-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 ${
                          touched.name && errors.name 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200 focus:border-[#d4af37]"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5 stagger-item stagger-item-3">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-gray-400 font-light">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 ${
                          touched.email && errors.email 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200 focus:border-[#d4af37]"
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5 stagger-item stagger-item-4">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 ${
                          touched.phone && errors.phone 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200 focus:border-[#d4af37]"
                        }`}
                        placeholder="98765 43210"
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5 stagger-item stagger-item-5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 resize-none ${
                          touched.message && errors.message 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200 focus:border-[#d4af37]"
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                    {touched.message && errors.message && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full py-3.5 mt-2 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm stagger-item stagger-item-5 ${
                      isSubmitting || !isFormValid 
                        ? "opacity-50 cursor-not-allowed" 
                        : "hover:shadow-xl hover:shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

            {/* Footer */}
            <div className="px-8 pb-5 text-center border-t border-gray-50 pt-4">
              <p className="text-xs text-gray-400 font-light">Your information is secure and confidential</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;