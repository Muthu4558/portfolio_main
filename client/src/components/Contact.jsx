// Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaPaperPlane, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const PRIMARY = "#6c845d";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Make it simple, but significant.", author: "Don Draper (well-suited for design & dev)" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Please enter a message";
    return e;
  };

  const handleChange = (k) => (ev) => {
    setForm((s) => ({ ...s, [k]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

const handleSubmit = async (ev) => {
  ev.preventDefault();
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setSubmitting(true);
  try {
    const resp = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.error || "Failed to send message");

    // 🎉 Success toast
    toast.success("Message sent successfully! ✅");

    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  } catch (err) {
    console.error("Contact send error:", err);
    toast.error("Failed to send message. Please try again later. ❌");
    setErrors((prev) => ({ ...prev, submit: err.message || "Failed to send" }));
  } finally {
    setSubmitting(false);
  }
};


  const nextQuote = () => setQuoteIndex((i) => (i + 1) % quotes.length);

  const focusStyle = (field) =>
    focusedField === field ? { boxShadow: `0 8px 30px ${PRIMARY}22, 0 0 0 4px ${PRIMARY}18`, borderColor: PRIMARY } : {};

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: contact form */}
          <motion.div
            className="lg:col-span-7 bg-linear-to-b from-white to-[#f6fbf6] p-6 sm:p-8 rounded-2xl shadow-lg border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>
                  Get in touch
                </h3>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Let’s build something <br className="hidden sm:block" /> together
                </h2>
                <p className="mt-2 text-sm text-slate-600 max-w-xl">
                  Prefer email? Use the form and I’ll reply within a day. For urgent work, call or email directly using the icons.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={focusStyle("name")}
                    className={`peer w-full bg-white border ${errors.name ? "border-rose-400" : "border-slate-200"} rounded-lg px-4 py-3 outline-none transition`}
                    placeholder=" "
                    aria-label="Your name"
                  />
                  <span className={`absolute left-4 top-0 text-xs text-slate-500 transition-transform peer-focus:-translate-y-4 peer-focus:scale-95 ${form.name ? "-translate-y-4 scale-95" : "translate-y-0"}`}>
                    Your name
                  </span>
                  {errors.name && <div className="mt-1 text-xs text-rose-500">{errors.name}</div>}
                </label>

                <label className="relative">
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={focusStyle("email")}
                    className={`peer w-full bg-white border ${errors.email ? "border-rose-400" : "border-slate-200"} rounded-lg px-4 py-3 outline-none transition`}
                    placeholder=" "
                    aria-label="Your email"
                  />
                  <span className={`absolute left-4 top-0 text-xs text-slate-500 transition-transform peer-focus:-translate-y-4 peer-focus:scale-95 ${form.email ? "-translate-y-4 scale-95" : "translate-y-0"}`}>
                    Your email
                  </span>
                  {errors.email && <div className="mt-1 text-xs text-rose-500">{errors.email}</div>}
                </label>
              </div>

              <label className="relative">
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle("subject")}
                  className="peer w-full bg-white border border-slate-200 rounded-lg px-4 py-3 outline-none transition"
                  placeholder=" "
                  aria-label="Subject (optional)"
                />
                <span className={`absolute left-4 top-0 text-xs text-slate-500 transition-transform peer-focus:-translate-y-4 peer-focus:scale-95 ${form.subject ? "-translate-y-4 scale-95" : "translate-y-0"}`}>
                  Subject (optional)
                </span>
              </label>

              <label className="relative">
                <textarea
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={6}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle("message")}
                  className={`peer w-full bg-white border ${errors.message ? "border-rose-400" : "border-slate-200"} rounded-lg px-4 py-3 outline-none transition resize-none`}
                  placeholder=" "
                  aria-label="Message"
                />
                <span className={`absolute left-4 top-0 text-xs text-slate-500 transition-transform peer-focus:-translate-y-4 peer-focus:scale-95 ${form.message ? "-translate-y-4 scale-95" : "translate-y-0"}`}>
                  Your message
                </span>
                {errors.message && <div className="mt-1 text-xs text-rose-500">{errors.message}</div>}
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -2 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-[#6c845d] to-[#556e4d] text-white font-semibold shadow"
                  aria-label="Send message"
                >
                  <FaPaperPlane /> {submitting ? "Sending…" : "Send message"}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}
                  className="w-full sm:w-auto px-4 py-3 rounded-full border text-sm hover:shadow-sm transition"
                >
                  Reset
                </button>

                {sent && <div className="mt-2 sm:mt-0 text-sm text-green-600">Mail client opened — check your email app.</div>}
              </div>
            </form>
          </motion.div>

          {/* Right: quote + quick contact card + socials */}
          <motion.aside className="lg:col-span-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06 }}>
            <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-b from-[#f8fbf8] to-white border shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: PRIMARY }}>
                  M
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Muthu V</h4>
                  <p className="text-sm text-slate-600">Web Developer — Frontend & MERN</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div>
                  <strong>Phone:</strong> <span className="ml-1">6385931500</span>
                </div>
                <div>
                  <strong>Email:</strong> <span className="ml-1">muthu03072003@gmail.com</span>
                </div>

                <div className="mt-3">
                  <a href="/CV MERN.pdf" download className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(108,132,93,0.95)] text-white font-semibold text-sm">
                    Download CV
                  </a>
                </div>
              </div>
            </div>

            {/* Quote box */}
            <motion.div className="mt-5 p-5 rounded-2xl bg-white border shadow-sm" whileHover={{ scale: 1.02 }}>
              <motion.blockquote key={quoteIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <p className="text-slate-800 italic text-sm">“{quotes[quoteIndex].text}”</p>
                <footer className="mt-3 text-xs text-slate-500">— {quotes[quoteIndex].author}</footer>
              </motion.blockquote>

              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button onClick={nextQuote} className="px-3 py-2 rounded-full border text-sm hover:bg-[rgba(108,132,93,0.06)] transition">
                  Another quote
                </button>
                <div className="text-xs text-slate-500">A little inspiration for hiring managers ✨</div>
              </div>
            </motion.div>

            {/* Socials box */}
            <motion.div className="mt-5 p-5 rounded-2xl bg-white border shadow-sm">
              <h5 className="text-sm font-semibold text-slate-900">Find me on</h5>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="https://github.com/Muthu4558" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black text-white text-sm shadow-sm">
                  <FaGithub /> GitHub
                </a>

                <a href="https://linkedin.com/in/muthu-v-a74583275/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-sm shadow-sm">
                  <FaLinkedin /> LinkedIn
                </a>

                <a href="https://wa.me/916385931500" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-500 text-white text-sm shadow-sm">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
