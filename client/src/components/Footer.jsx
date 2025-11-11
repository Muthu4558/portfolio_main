// Footer.jsx
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaArrowUp } from "react-icons/fa";
import logo from '../assets/Dev.png';

const PRIMARY = "#6c845d";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    // simple mailto subscribe action (no backend). Replace with Formspree or API as needed
    const subject = encodeURIComponent("Subscribe to portfolio updates");
    const body = encodeURIComponent(`Please subscribe ${email} to updates.`);
    window.location.href = `mailto:muthu03072003@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }, 700);
  };

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white border-t mt-16 text-slate-700">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt="logo" className="w-28 h-auto object-contain" />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: PRIMARY }}>
                  M
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600">
              I build fast, accessible and beautiful web apps. Looking for a developer? Let’s connect.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a href="https://github.com/Muthu4558" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:scale-105 transition">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/muthu-v-a74583275/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:scale-105 transition">
                <FaLinkedin />
              </a>
              <a href="mailto:muthu03072003@gmail.com" aria-label="Email" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:scale-105 transition">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-slate-600 hover:text-slate-900 transition">Home</a>
              </li>
              <li>
                <a href="#about" className="text-slate-600 hover:text-slate-900 transition">About</a>
              </li>
              <li>
                <a href="#projects" className="text-slate-600 hover:text-slate-900 transition">Projects</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-600 hover:text-slate-900 transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact</h4>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="p-2 rounded-full bg-slate-100">
                <FaPhoneAlt style={{ color: PRIMARY }} />
              </div>
              <div>
                <div className="text-xs text-slate-500">Phone</div>
                <a href="tel:+916385931500" className="font-medium block">+91 63859 31500</a>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-700">
              <div className="p-2 rounded-full bg-slate-100">
                <FaEnvelope style={{ color: PRIMARY }} />
              </div>
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <a href="mailto:muthu03072003@gmail.com" className="font-medium block">muthu03072003@gmail.com</a>
              </div>
            </div>

            {/* <div className="mt-6">
              <h5 className="text-xs font-semibold text-slate-900 mb-2">Subscribe</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2"
                  aria-label="Subscribe email"
                />
                <button type="submit" className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: PRIMARY }}>
                  {submitting ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
              {subscribed && <p className="mt-2 text-sm text-green-600">Thanks — check your email to confirm.</p>}
            </div> */}
          </div>

          {/* Small bio + copyright */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Keep exploring</h4>
            <p className="text-sm text-slate-600">
              Feel free to browse my projects and reach out for collaboration or full-time roles. I reply quickly.
            </p>

            <div className="mt-6 text-sm text-slate-500 space-y-2">
              <div>Made with ❤️ using MERN Stack.</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar + back to top */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>Designed & developed by Muthu V</div>
          <div>&copy; {new Date().getFullYear()}. All rights reserved.</div>
        </div>

        <button aria-label="Back to top" onClick={handleBackToTop} className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white hover:scale-105 transition" style={{ border: `2px solid ${PRIMARY}` }}>
          <FaArrowUp style={{ color: PRIMARY }} />
        </button>
      </div>
    </footer>
  );
}
