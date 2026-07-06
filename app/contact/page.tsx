"use client";

import { MapPin, Phone, Mail, Clock, Send, Check, X, AlertCircle } from "lucide-react";
import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

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
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          formType: "contact",
          ...formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit form");
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

  const contactInfo = [
    { 
      icon: MapPin, 
      title: "Visit Us", 
      details: ["123 Luxury Avenue", "Mumbai, India 400001"] 
    },
    { 
      icon: Phone, 
      title: "Call Us", 
      details: ["+91 99999 99999", "+91 88888 88888"],
      isPhone: true
    },
    { 
      icon: Mail, 
      title: "Email Us", 
      details: ["info@vistaarestate.com"] 
    },
    { 
      icon: Clock, 
      title: "Working Hours", 
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Sat: 10:00 AM - 6:00 PM"] 
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a2e] mb-4">
            Contact <span className="text-[#d4af37]">Us</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Our team is here to assist you with your real estate needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, idx) => (
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
                      info.isPhone ? (
                        <a 
                          key={i} 
                          href={`tel:${detail.replace(/\s/g, '')}`}
                          className="text-[#2d2d44] text-sm hover:text-[#d4af37] transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-[#2d2d44] text-sm">
                          {detail}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#f5efe6] p-8 rounded-2xl">
              <h2 className="text-2xl font-serif font-bold text-[#1a1a2e] mb-6">
                Send Us a <span className="text-[#d4af37]">Message</span>
              </h2>

              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#1a1a2e] mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                      <X className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-colors bg-white ${
                          touched.name && errors.name 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200"
                        }`}
                        placeholder="Your name"
                      />
                      {touched.name && errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                        Email Address <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-colors bg-white ${
                          touched.email && errors.email 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-gray-200"
                        }`}
                        placeholder="your@email.com"
                      />
                      {touched.email && errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-colors bg-white ${
                        touched.phone && errors.phone 
                          ? "border-red-300 focus:ring-red-300" 
                          : "border-gray-200"
                      }`}
                      placeholder="+91 99999 99999"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-colors bg-white resize-none ${
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
                    className={`w-full px-6 py-3 bg-[#d4af37] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-300 ${
                      isSubmitting || !isFormValid 
                        ? "opacity-50 cursor-not-allowed" 
                        : "hover:bg-[#b8942a]"
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
    </div>
  );
};

export default ContactPage;
