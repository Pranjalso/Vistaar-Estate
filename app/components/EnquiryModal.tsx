"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardEdit, X, Send, Check, AlertCircle, Sparkles } from "lucide-react";

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

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "";
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
    if (message.trim() && message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      let nextError = "";
      if (name === "name") nextError = validateName(value);
      if (name === "email") nextError = validateEmail(value);
      if (name === "phone") nextError = validatePhone(value);
      if (name === "message") nextError = validateMessage(value);

      setErrors((prev) => ({ ...prev, [name]: nextError }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let nextError = "";
    if (name === "name") nextError = validateName(value);
    if (name === "email") nextError = validateEmail(value);
    if (name === "phone") nextError = validatePhone(value);
    if (name === "message") nextError = validateMessage(value);

    setErrors((prev) => ({ ...prev, [name]: nextError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    };

    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    const hasErrors = Object.values(nextErrors).some((err) => err);
    if (hasErrors) return;

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "enquiry", ...formData }),
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
      window.setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.phone &&
    !errors.message &&
    formData.name.trim() &&
    formData.phone.trim();

  const inputClasses = (fieldName: keyof FormErrors) =>
    `peer w-full border rounded-2xl bg-white/90 px-4 pt-6 pb-2 text-sm text-[#1a1a2e] shadow-sm outline-none transition-all duration-300 ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-[#e5dfd0] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
    }`;

  const labelClasses = (fieldName: keyof FormErrors, value: string) =>
    `pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-all duration-300 ${
      value || (touched[fieldName] && errors[fieldName])
        ? "top-2 text-[11px] text-[#d4af37]"
        : ""
    }`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center px-3 py-4 sm:px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="absolute inset-0 bg-[#05070d]/70 backdrop-blur-xl" />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/70 bg-[#fcfaf7] shadow-[0_25px_80px_rgba(0,0,0,0.24)]"
        >
          <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#e8c84a] to-[#b8942a]" />

          <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37] shadow-inner">
                  <ClipboardEdit className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#fff8e8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b8942a]">
                    <Sparkles className="h-3 w-3" />
                    Private Consultation
                  </div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e]">Request Your Viewing</h2>
                  <p className="mt-1 text-sm text-slate-500">We&apos;ll respond with tailored insights within one business day.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:border-[#d4af37]/30 hover:text-[#d4af37]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            {isSuccess ? (
              <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Thank You!</h3>
                <p className="mt-2 text-sm text-slate-600">Your enquiry has been received. A specialist will contact you shortly.</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClasses("name")}
                      placeholder=" "
                    />
                    <label className={labelClasses("name", formData.name)}>Full Name</label>
                    {touched.name && errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClasses("phone")}
                      placeholder=" "
                    />
                    <label className={labelClasses("phone", formData.phone)}>Phone Number</label>
                    {touched.phone && errors.phone && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={inputClasses("email")}
                    placeholder=" "
                  />
                  <label className={labelClasses("email", formData.email)}>Email Address</label>
                  {touched.email && errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`${inputClasses("message")} resize-none pt-6`}
                    placeholder=" "
                  />
                  <label className={labelClasses("message", formData.message)}>Your Requirements</label>
                  {touched.message && errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b8942a] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#d4af37]/20 transition-all duration-300 ${
                    isSubmitting || !isFormValid
                      ? "cursor-not-allowed opacity-60"
                      : "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#d4af37]/30"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          <div className="px-5 pb-5 text-center text-[11px] uppercase tracking-[0.24em] text-slate-400 sm:px-6">
            Your privacy is protected and your details remain confidential.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
