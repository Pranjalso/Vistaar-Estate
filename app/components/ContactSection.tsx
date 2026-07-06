"use client";

import {
  MapPin,
  Phone,
  Mail,
  Send,
  X,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Clock,
  Star,
  MessageCircle,
  ChevronDown,
  User,
  Building2,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  "Buy a Property",
  "Sell a Property",
  "Rent / Lease",
  "Investment Advisory",
  "Site Visit Booking",
  "General Inquiry",
];

const trustSignals = [
  { icon: Star, label: "4.9★ Rating", sub: "500+ Reviews" },
  { icon: Clock, label: "< 2 Hrs", sub: "Response Time" },
  { icon: Building2, label: "500+", sub: "Properties Sold" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [error, setError] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const controls = {
    leftContent: useAnimation(),
    rightContent: useAnimation(),
    cards: useAnimation(),
  };

  useEffect(() => {
    if (isInView) {
      controls.leftContent.start("visible");
      controls.rightContent.start("visible");
      controls.cards.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClick = () => setSubjectOpen(false);
    if (subjectOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [subjectOpen]);

  const resetFormState = () => {
    setFormData({ ...initialFormData });
    setErrors({});
    setTouched({});
    setError("");
    setIsSuccess(false);
    setSubmittedName("");
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  };

  // Count words in a string
  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const validateName = (v: string) => {
    if (!v.trim()) return "Name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };
  const validateEmail = (v: string) => {
    if (!v.trim()) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  };
  const validatePhone = (v: string) => {
    if (!v.trim()) return "Phone number is required";
    const clean = v.replace(/\D/g, "");
    if (clean.length !== 10) return "Phone must be exactly 10 digits";
    if (!/^[6-9]\d{9}$/.test(clean)) return "Enter a valid Indian mobile number";
    return "";
  };
  const validateSubject = (v: string) => {
    if (!v.trim()) return "Please select an inquiry type";
    return "";
  };
  const validateMessage = (v: string) => {
    if (!v.trim()) return "Message is required";
    const wordCount = countWords(v);
    if (wordCount < 5) return "Message must be at least 5 words";
    if (wordCount > 20) return "Message must be 20 words or less";
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // For message field, limit to 20 words
    if (name === "message") {
      const wordCount = countWords(value);
      if (wordCount > 20) {
        // Prevent adding more words beyond the limit
        const words = value.trim().split(/\s+/);
        const truncated = words.slice(0, 20).join(" ");
        setFormData((prev) => ({ ...prev, [name]: truncated }));
        return;
      }
    }
    
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

  const selectSubject = (opt: string) => {
    setFormData((prev) => ({ ...prev, subject: opt }));
    setErrors((prev) => ({ ...prev, subject: "" }));
    setTouched((prev) => ({ ...prev, subject: true }));
    setSubjectOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      subject: validateSubject(formData.subject),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.values(newErrors).some((e) => e)) return;

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", ...formData }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      setSubmittedName(formData.name.trim().split(" ")[0]);
      setIsSuccess(true);
      setFormData({ ...initialFormData });
      setErrors({});
      setTouched({});
      setError("");
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
    !errors.subject &&
    !errors.message &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Luxury Avenue", "Mumbai, India 400001"],
      href: null as string | null,
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 99999 99999", "+91 88888 88888"],
      href: "tel:" as string | null,
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@vistaarestate.com"],
      href: "mailto:" as string | null,
    },
  ];

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: "easeOut" as const } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: "easeOut" as const } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-5 py-4 bg-white/70 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] transition-all duration-300 text-[#1a1a2e] placeholder:text-[#2d2d44]/30 text-[15px] cursor-text ${
      touched[field] && errors[field]
        ? "border-red-300 bg-red-50/20 focus:ring-red-200"
        : "border-[#d4af37]/15 hover:border-[#d4af37]/30"
    }`;

  // Get current word count for display
  const currentWordCount = countWords(formData.message);
  const maxWords = 20;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#f5efe6] via-white to-[#faf8f5] relative overflow-hidden"
      id="contact"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] bg-[#d4af37]/[0.035] rounded-full blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[700px] h-[700px] bg-[#d4af37]/[0.025] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#d4af37]/[0.015] rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
        <div className="absolute top-16 right-8 w-72 h-72 border border-[#d4af37]/6 rounded-full" />
        <div className="absolute bottom-16 left-8 w-52 h-52 border border-[#d4af37]/6 rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 xl:gap-32 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-14">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={controls.leftContent}
              className="space-y-5 text-center lg:text-left"
            >

              <h2 className="font-serif text-3xl font-bold text-[#1a1a2e] leading-[1.05]">
                {"Let's Start a"}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]">
                  Conversation
                </span>
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent mx-auto lg:mx-0" />
              <p className="text-base sm:text-lg text-[#2d2d44]/65 leading-relaxed max-w-md mx-auto lg:mx-0">
                Our team of experts is here to help you find your dream
                property. Reach out through any channel.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={controls.cards}
              className="space-y-4"
            >
              {contactInfo.map((info, idx) => (
                <motion.div key={idx} variants={staggerItem} className="group">
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#d4af37]/10 hover:border-[#d4af37]/35 rounded-[26px] p-6 transition-all duration-500 hover:shadow-xl hover:shadow-[#d4af37]/12 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[26px]" />
                    <div className="relative flex items-center gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#d4af37]/12 to-[#b8942a]/6 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#d4af37]/20 transition-all duration-300">
                          <info.icon className="w-5 h-5 text-[#d4af37]" strokeWidth={1.8} />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#d4af37] tracking-widest uppercase mb-1">
                          {info.title}
                        </p>
                        {info.details.map((detail, i) =>
                          info.href ? (
                            <a
                              key={i}
                              href={`${info.href}${detail.replace(/\s/g, "")}`}
                              className="text-sm text-[#1a1a2e] hover:text-[#d4af37] transition-colors block font-light leading-relaxed"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-sm text-[#1a1a2e]/75 font-light leading-relaxed">
                              {detail}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={controls.leftContent}
              className="grid grid-cols-3 gap-4"
            >
              {trustSignals.map((ts, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-2xl bg-white/60 border border-[#d4af37]/10 hover:border-[#d4af37]/25 transition-all duration-300 hover:shadow-md hover:shadow-[#d4af37]/8"
                >
                  <ts.icon className="w-5 h-5 text-[#d4af37] mx-auto mb-2" strokeWidth={1.8} />
                  <p className="text-sm font-semibold text-[#1a1a2e]">{ts.label}</p>
                  <p className="text-xs text-[#2d2d44]/50 mt-0.5">{ts.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={controls.rightContent}
            className="relative"
          >
            <div className="relative bg-white/95 backdrop-blur-sm rounded-[36px] shadow-2xl shadow-[#d4af37]/10 border border-[#d4af37]/12 overflow-hidden">
              {/* Gold accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5]/60 via-white to-[#f5efe6]/40 pointer-events-none" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* SUCCESS / THANK YOU STATE — Premium Gold & Ivory */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative p-8 md:p-12 flex flex-col items-center text-center min-h-[580px] justify-center"
                  >
                    {/* Soft ambient rings */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[36px]">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] border border-[#d4af37]/6 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-[#d4af37]/8 rounded-full" />
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d4af37]/4 rounded-full blur-2xl" />
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#b8942a]/4 rounded-full blur-2xl" />
                    </div>

                    {/* Gold success icon */}
                    <div className="relative mb-8">
                      <motion.div
                        animate={{ scale: [0.8, 1.45, 1.45], opacity: [0, 0.16, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 rounded-full bg-[#d4af37]"
                      />
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 1.2], opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2.4, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 rounded-full bg-[#d4af37]"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.06 }}
                        className="relative w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#e8c84a] via-[#d4af37] to-[#b8942a] flex items-center justify-center shadow-[0_16px_48px_rgba(212,175,55,0.35),0_4px_12px_rgba(212,175,55,0.2)]"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white drop-shadow-sm" strokeWidth={2} />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0.75, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.55, delay: 0.28 }}
                        className="absolute inset-[-8px] rounded-full border border-[#d4af37]/25"
                      />
                    </div>

                    {/* Heading */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.26 }}
                      className="space-y-3 mb-7"
                    >
                      <h3 className="font-serif text-[28px] md:text-[36px] font-bold text-[#1a1a2e] leading-tight">
                        {submittedName ? (
                          <>
                            Thank You,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8942a]">
                              {submittedName}
                            </span>
                            !
                          </>
                        ) : (
                          <>
                            Enquiry{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8942a]">
                              Received
                            </span>
                          </>
                        )}
                      </h3>
                      <p className="text-[#2d2d44]/55 text-[15px] leading-relaxed max-w-[280px] mx-auto">
                        Your message is with us. Our property advisor will reach out within{" "}
                        <span className="text-[#b8942a] font-semibold">2 hours</span>.
                      </p>
                    </motion.div>

                    {/* Gold divider */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.38 }}
                      className="w-14 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-7"
                    />

                    {/* What happens next */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.44 }}
                      className="w-full max-w-[320px] mb-9 space-y-2.5"
                    >
                      <p className="text-[10px] font-semibold text-[#2d2d44]/35 uppercase tracking-[0.18em] mb-4">
                        What happens next
                      </p>
                      {[
                        { icon: MessageCircle, text: "Our advisor will call or email you back", gradient: "from-[#d4af37] to-[#c9a84c]" },
                        { icon: Building2, text: "We match properties to your requirements", gradient: "from-[#b8942a] to-[#a07828]" },
                        { icon: Star, text: "Receive curated recommendations just for you", gradient: "from-[#d4af37] to-[#b8942a]" },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.52 + i * 0.1 }}
                          className="flex items-center gap-3 bg-gradient-to-r from-[#faf8f4] to-white rounded-2xl px-4 py-3 border border-[#d4af37]/10 shadow-sm"
                        >
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-md shadow-[#d4af37]/20`}>
                            <step.icon className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
                          </div>
                          <p className="text-[13px] text-[#2d2d44]/65 text-left leading-snug">{step.text}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA — premium dark */}
                    <motion.button
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.72 }}
                      onClick={resetFormState}
                      className="group relative px-8 py-3.5 bg-[#1a1a2e] hover:bg-[#252540] text-white rounded-full font-medium text-sm flex items-center gap-2.5 mx-auto hover:shadow-[0_12px_32px_rgba(26,26,46,0.22)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      <Send className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative" strokeWidth={1.8} />
                      <span className="relative">Send Another Message</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform duration-300 relative" />
                    </motion.button>
                  </motion.div>
                ) : (
                  /* FORM STATE */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative p-8 md:p-10 lg:p-12"
                  >
                    <div className="mb-8">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#b8942a]/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-[#d4af37]" strokeWidth={1.8} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1a2e]">
                          Send Us a{" "}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8942a]">
                            Message
                          </span>
                        </h3>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-4 bg-red-50/80 border border-red-200/60 rounded-2xl text-red-600 text-sm flex items-start gap-2.5"
                      >
                        <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#1a1a2e]/80 block tracking-widest uppercase">
                            Full Name <span className="text-[#d4af37]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={inputClass("name")}
                            placeholder="Arjun Sharma"
                            autoComplete="name"
                          />
                          {touched.name && errors.name && (
                            <p className="text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#1a1a2e]/80 block tracking-widest uppercase">
                            Phone <span className="text-[#d4af37]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d2d44]/40 text-sm font-medium pointer-events-none select-none border-r border-[#d4af37]/20 pr-3 leading-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              className={`${inputClass("phone")} pl-[4.5rem]`}
                              placeholder="98765 43210"
                              autoComplete="tel"
                              maxLength={11}
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#1a1a2e]/80 block tracking-widest uppercase">
                          Email{" "}
                          <span className="text-[#2d2d44]/30 font-light normal-case tracking-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={inputClass("email")}
                          placeholder="arjun@example.com"
                          autoComplete="email"
                        />
                        {touched.email && errors.email && (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Inquiry Type dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#1a1a2e]/80 block tracking-widest uppercase">
                          Inquiry Type <span className="text-[#d4af37]">*</span>
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSubjectOpen((o) => !o);
                            }}
                            className={`w-full px-5 py-4 bg-white/70 border rounded-2xl text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                              touched.subject && errors.subject
                                ? "border-red-300 bg-red-50/20"
                                : subjectOpen
                                ? "border-[#d4af37] ring-2 ring-[#d4af37]/30"
                                : "border-[#d4af37]/15 hover:border-[#d4af37]/30"
                            }`}
                          >
                            <span className={`text-[15px] ${formData.subject ? "text-[#1a1a2e]" : "text-[#2d2d44]/30"}`}>
                              {formData.subject || "Select inquiry type…"}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${subjectOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {subjectOpen && (
                              <motion.ul
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.16 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d4af37]/20 rounded-2xl shadow-xl shadow-[#d4af37]/10 overflow-hidden z-50"
                              >
                                {subjectOptions.map((opt) => (
                                  <li key={opt}>
                                    <button
                                      type="button"
                                      onClick={() => selectSubject(opt)}
                                      className={`w-full text-left px-5 py-3 text-sm transition-all duration-200 cursor-pointer ${
                                        formData.subject === opt
                                          ? "bg-[#d4af37]/10 text-[#b8942a] font-medium"
                                          : "text-[#1a1a2e]/70 hover:bg-[#f5efe6] hover:text-[#1a1a2e]"
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                        {touched.subject && errors.subject && (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message with 20-word limit */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#1a1a2e]/80 block tracking-widest uppercase">
                          Message <span className="text-[#d4af37]">*</span>
                          <span className="text-[#2d2d44]/30 font-light normal-case tracking-normal ml-1">
                            ({currentWordCount}/{maxWords} words)
                          </span>
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`${inputClass("message")} resize-none leading-relaxed`}
                          placeholder="Tell us about your requirements — budget, location, BHK, timeline... (max 20 words)"
                          maxLength={150}
                        />
                        <div className="flex items-start justify-between gap-2">
                          {touched.message && errors.message ? (
                            <p className="text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.message}
                            </p>
                          ) : (
                            <span />
                          )}
                          <span className={`text-xs tabular-nums ml-auto flex-shrink-0 ${
                            currentWordCount > 15 
                              ? currentWordCount >= 20 
                                ? "text-red-400 font-medium" 
                                : "text-amber-400"
                              : "text-[#2d2d44]/30"
                          }`}>
                            {currentWordCount}/{maxWords} words
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isFormValid}
                          className={`group relative w-auto mx-auto sm:mx-0 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#d4af37] to-[#b8942a] text-white rounded-full font-medium text-sm flex items-center justify-center gap-2.5 transition-all duration-500 overflow-hidden ${
                            isSubmitting || !isFormValid
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Sending your message…</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.8} />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                        <p className="text-xs text-center text-[#2d2d44]/30 mt-3 leading-relaxed">
                          By submitting, you agree to be contacted by our advisory team.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;