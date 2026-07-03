"use client";

import { useState, useEffect } from "react";
import { ClipboardEdit, X, Send, Check, AlertCircle } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  propertyName,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyName ? `Interested in ${propertyName}` : "",
    property: propertyName || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: propertyName ? `Interested in ${propertyName}` : "",
        property: propertyName || "",
      });
      setErrors({});
      setTouched({});
      setIsSuccess(false);
      setError("");
    }
  }, [isOpen, propertyName]);

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

  const validateMessage = (message: string) => {
    if (message.trim() && message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      let error = "";
      if (name === "name") error = validateName(value);
      if (name === "email") error = validateEmail(value);
      if (name === "phone") error = validatePhone(value);
      if (name === "message") error = validateMessage(value);
      
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "message") error = validateMessage(value);
    
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
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
    
    // Check if any errors
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
          ...formData,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit enquiry");
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: propertyName ? `Interested in ${propertyName}` : "",
        property: propertyName || "",
      });
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Check if form is valid for disabling button
  const isFormValid = 
    !errors.name && 
    !errors.email && 
    !errors.phone && 
    !errors.message && 
    formData.name.trim() && 
    formData.phone.trim();

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
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
              onClick={onClose}
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
              
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Phone Field */}
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

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Message <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none text-sm resize-none ${
                    touched.message && errors.message 
                      ? "border-red-300 focus:ring-red-300" 
                      : "border-gray-200"
                  }`}
                  placeholder="Tell us about your requirements..."
                />
                {touched.message && errors.message && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
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
  );
};

export default EnquiryModal;
