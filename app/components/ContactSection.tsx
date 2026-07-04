"use client";

import { MapPin, Phone, Mail, Send, X, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

const ContactSection = () => {
  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const sectionRef = useRef<HTMLElement>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const controls = {
    leftContent: useAnimation(),
    rightContent: useAnimation(),
    cards: useAnimation(),
    formFields: useAnimation(),
  };

  useEffect(() => {
    if (isInView) {
      controls.leftContent.start("visible");
      controls.rightContent.start("visible");
      controls.cards.start("visible");
      controls.formFields.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const resetFormState = () => {
    setFormData({ ...initialFormData });
    setErrors({});
    setTouched({});
    setError("");
    setIsSuccess(false);
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  };

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
      setFormData({ ...initialFormData });
      setErrors({});
      setTouched({});
      setError("");

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      successTimeoutRef.current = setTimeout(() => {
        setIsSuccess(false);
      }, 8000);
      
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
    { icon: MapPin, title: "Visit Us", details: ["123 Luxury Avenue", "Mumbai, India 400001"] },
    { 
      icon: Phone, 
      title: "Call Us", 
      details: ["+91 99999 99999", "+91 88888 88888"],
      isPhone: true
    },
    { icon: Mail, title: "Email Us", details: ["info@vistaarestate.com"] },
  ];

  // Animation variants
  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: 'easeOut' as const }
    }
  };

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: 'easeOut' as const }
    }
  };

  const staggerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  const staggerItemVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const }
    }
  };

  const formContainerVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: 'easeOut' as const }
    }
  };

  const formFieldVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#f5efe6] via-white to-[#faf8f5] relative overflow-hidden" 
      id="contact"
    >
      {/* Premium Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Glow Orbs */}
        <div className="absolute -top-56 -right-56 w-[600px] h-[600px] bg-[#d4af37]/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-56 -left-56 w-[600px] h-[600px] bg-[#d4af37]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#d4af37]/[0.02] rounded-full blur-3xl" />
        
        {/* Decorative Gold Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        
        {/* Abstract Geometric Shape */}
        <div className="absolute top-20 right-10 w-64 h-64 border border-[#d4af37]/5 rounded-full blur-sm" />
        <div className="absolute bottom-20 left-10 w-48 h-48 border border-[#d4af37]/5 rounded-full blur-sm" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 xl:gap-32">
          
          {/* Left Column - Heading & Contact Info */}
          <div className="space-y-14">
            {/* Heading */}
            <motion.div
              variants={fadeLeftVariant}
              initial="hidden"
              animate={controls.leftContent}
              className="space-y-5"
            >
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-medium">
                Contact Us
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-[#1a1a2e] leading-[1.05]">
                Let's Start a
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]">
                  Conversation
                </span>
              </h2>
              
              {/* Decorative Gold Line */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent" />
              
              <p className="text-base sm:text-lg text-[#2d2d44]/70 leading-relaxed max-w-md">
                Our team of experts is here to help you find your dream property. 
                Reach out to us through any channel below.
              </p>
            </motion.div>

            {/* Contact Cards - Premium Redesign */}
            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              animate={controls.cards}
              className="space-y-5"
            >
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItemVariant}
                  className="group relative overflow-hidden"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#d4af37]/10 hover:border-[#d4af37]/40 rounded-[28px] p-6 md:p-7 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/15 hover:-translate-y-1.5 hover:scale-[1.01]">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]" />
                    
                    <div className="relative flex items-center gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37]/10 to-[#b8942a]/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#d4af37]/20 transition-all duration-500 group-hover:bg-[#d4af37]/20">
                          <info.icon className="w-6 h-6 text-[#d4af37] group-hover:scale-105 transition-transform duration-300" strokeWidth={1.8} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors duration-300 tracking-wide">
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          info.isPhone ? (
                            <a 
                              key={i} 
                              href={`tel:${detail.replace(/\s/g, '')}`}
                              className="text-sm text-[#2d2d44]/70 hover:text-[#d4af37] transition-colors block font-light"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-sm text-[#2d2d44]/70 font-light">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                    
                    {/* Decorative Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#d4af37]/10 rotate-45" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Premium Contact Form */}
          <motion.div
            variants={fadeRightVariant}
            initial="hidden"
            animate={controls.rightContent}
            className="relative"
          >
            <div className="relative bg-white/95 backdrop-blur-sm p-8 md:p-10 lg:p-12 rounded-[32px] shadow-3xl shadow-[#d4af37]/8 border border-[#d4af37]/10 transition-all duration-500 hover:shadow-4xl hover:shadow-[#d4af37]/12">
              {/* Form Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-white to-[#f5efe6] rounded-[32px] opacity-50" />
              
              <motion.form
                variants={formContainerVariant}
                initial="hidden"
                animate={controls.formFields}
                onSubmit={handleSubmit}
                className="relative space-y-6 cursor-default"
              >
                <div className="text-center sm:text-left mb-8">
                  {isSuccess && (
                    <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-left">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-green-700">Thank you! Your message was sent successfully.</p>
                          <p className="text-sm text-green-600">We will get back to you shortly.</p>
                        </div>
                        <button
                          type="button"
                          onClick={resetFormState}
                          className="rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 transition-all duration-300 hover:border-green-300 hover:bg-green-100 cursor-default"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1a2e]">
                    Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8942a]">Message</span>
                  </h3>
                  <p className="text-sm text-[#2d2d44]/50 font-light mt-1">We'll respond within 24 hours</p>
                </div>

                  {error && (
                    <div className="p-4 bg-red-50/80 border border-red-200/50 rounded-xl text-red-600 text-sm flex items-center gap-2">
                      <X className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Form Fields with Stagger Animation */}
                  <motion.div
                    variants={staggerContainerVariant}
                    initial="hidden"
                    animate={controls.formFields}
                    className="space-y-5"
                  >
                    <motion.div variants={formFieldVariant} className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block">
                        Full Name <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-5 py-4 bg-[#f5efe6]/40 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] transition-all duration-300 text-[#1a1a2e] placeholder:text-[#2d2d44]/30 text-base cursor-text ${
                          touched.name && errors.name 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-[#d4af37]/10"
                        }`}
                        placeholder="John Doe"
                      />
                      {touched.name && errors.name && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={formFieldVariant} className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block">
                        Email Address <span className="text-[#2d2d44]/40 font-light">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-5 py-4 bg-[#f5efe6]/40 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] transition-all duration-300 text-[#1a1a2e] placeholder:text-[#2d2d44]/30 text-base cursor-text ${
                          touched.email && errors.email 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-[#d4af37]/10"
                        }`}
                        placeholder="john@example.com"
                      />
                      {touched.email && errors.email && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={formFieldVariant} className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block">
                        Phone Number <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-5 py-4 bg-[#f5efe6]/40 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] transition-all duration-300 text-[#1a1a2e] placeholder:text-[#2d2d44]/30 text-base cursor-text ${
                          touched.phone && errors.phone 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-[#d4af37]/10"
                        }`}
                        placeholder="98765 43210"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={formFieldVariant} className="space-y-1.5">
                      <label className="text-sm font-medium text-[#1a1a2e] block">
                        Message <span className="text-[#d4af37]">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-5 py-4 bg-[#f5efe6]/40 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] transition-all duration-300 text-[#1a1a2e] placeholder:text-[#2d2d44]/30 text-base resize-none cursor-text ${
                          touched.message && errors.message 
                            ? "border-red-300 focus:ring-red-300" 
                            : "border-[#d4af37]/10"
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                      {touched.message && errors.message && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={formFieldVariant} className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className={`group relative w-full px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full font-medium flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden ${
                          isSubmitting || !isFormValid 
                            ? "opacity-50 cursor-not-allowed" 
                            : "hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        }`}
                      >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.8} />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.div>
                </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;