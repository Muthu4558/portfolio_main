// Projects.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import TaskGo from "../assets/projects/taskgo.png";
import ChatBot from "../assets/projects/chatbot.png";
import Musitechhub from "../assets/projects/musitechhub.png";
import School from "../assets/projects/school.png";
import Ecom1 from "../assets/projects/musi-ecom.png";
import Ecom2 from "../assets/projects/cake-ecom.png";
import Ecom3 from "../assets/projects/cloth-ecom.png";
import Neet from "../assets/projects/neet.png";
import Sector from "../assets/projects/28.png";

const PRIMARY = "#6c845d";

const projects = [
  { id: 1, title: "Taskgo", img: TaskGo, category: "Web APP", tech: ["MERN Stack"], short: "A sleek task & productivity app with smart lists, drag-drop and calendar sync.", visit: "https://taskgo.in/" },
  { id: 2, title: "Medical Chatbot", img: ChatBot, category: "Chatbot", tech: ["HTML,CSS", "JS", "Gemeni API"], short: "AI-assisted medical triage chatbot for patient guidance and triaging.", visit: "https://muthu4558.github.io/Medical-chatbot-Nizzy/" },
  { id: 3, title: "Musitechhub", img: Musitechhub, category: "Web APP", tech: ["MERN Stack"], short: "A creative agency site for Musitechhub — portfolio, services & contact.", visit: "https://musitechhub.com" },
  { id: 4, title: "VVJM - School", img: School, category: "Landing", tech: ["HTML,CSS", "JS", "PHP"], short: "School website with events, gallery and CMS-driven news pages.", visit: "https://muthu4558.github.io/VVJM/" },
  { id: 5, title: "E-commerce (Generic)", img: Ecom1, category: "E-commerce", tech: ["MERN Stack"], short: "Modern e-commerce platform — cart, checkout & order dashboard.", visit: "https://origin-organic.onrender.com" },
  { id: 6, title: "Cake E-commerce", img: Ecom2, category: "E-commerce", tech: ["HTML", "CSS", "JS"], short: "Specialised bakery storefront with custom cake builder UI.", visit: "https://muthu4558.github.io/Simple-cakeshop/" },
  { id: 7, title: "Clothing E-commerce", img: Ecom3, category: "E-commerce", tech: ["HTML", "CSS", "JS"], short: "Fashion storefront with product filters, sizes and variants.", visit: "https://muthu4558.github.io/e-commerce/" },
  { id: 8, title: "Education — Online Test & Notes", img: Neet, category: "Web APP", tech: ["MERN Stack"], short: "Online test portal with notes management and result analytics.", visit: "https://neet-aspire.onrender.com" },
  { id: 9, title: "28 Sector Landing Page", img: Sector, category: "Web APP", tech: ["MERN Stack"], short: "High-converting landing page for a niche product / vertical.", visit: "https://nizcare-co.onrender.com/" },
];

const categories = ["All", "Web APP", "E-commerce", "Chatbot", "Landing"];

export default function Projects() {
  // Read filter from URL on first render
  const [filter, setFilter] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("filter");
      return p && categories.includes(p) ? p : "All";
    } catch {
      return "All";
    }
  });

  const [active, setActive] = useState(null);
  const replaceTimeoutRef = useRef(null);

  // Update URL when filter changes (debounced)
  useEffect(() => {
    try {
      if (replaceTimeoutRef.current) clearTimeout(replaceTimeoutRef.current);
      replaceTimeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        if (filter && filter !== "All") params.set("filter", filter);
        else params.delete("filter");
        const newQuery = params.toString();
        const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "");
        window.history.replaceState({}, "", newUrl);
      }, 80);
    } catch {
      // ignore
    }
    return () => {
      if (replaceTimeoutRef.current) clearTimeout(replaceTimeoutRef.current);
    };
  }, [filter]);

  // Keep filter in sync with browser navigation (back/forward)
  useEffect(() => {
    const onPop = () => {
      try {
        const p = new URLSearchParams(window.location.search).get("filter");
        setFilter(p && categories.includes(p) ? p : "All");
      } catch {
        setFilter("All");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // keyboard close for modal (Esc)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    if (active !== null) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  // toggle handler: clicking same category again returns to All
  const handleFilter = useCallback((c) => {
    setActive(null); // close modal if open when switching filters
    setFilter((prev) => (prev === c ? "All" : c));
  }, []);

  // redirect current tab to project url
  const redirectTo = (url) => {
    if (!url) return;
    // assign/replace both work; use assign to keep history
    window.location.assign(url);
  };

  return (
    <section id="projects" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
          <div className="w-full lg:w-2/3">
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: PRIMARY }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: PRIMARY }} />
              Projects
            </h3>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900">Selected work</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">A selection of projects showcasing frontend, MERN and full-stack apps — click any card to view details or visit live.</p>
          </div>

          <div className="w-full lg:w-auto flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-[rgba(108,132,93,0.95)] text-white shadow" : "bg-white border border-slate-200 text-slate-700 hover:shadow-sm"}`}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <motion.li key={p.id} className="relative" variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <div className="group rounded-2xl overflow-hidden shadow-lg bg-white border">
                <div className="relative">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end backdrop-blur-sm">
                    <div className="p-4 w-full text-black">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{p.title}</h4>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{p.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-black/90">{p.short}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button onClick={() => setActive(p.id)} className="text-white inline-flex items-center gap-2 bg-white/10 border border-white/30 px-3 py-2 rounded-full text-xs hover:bg-white/20 transition" aria-label={`View ${p.title}`}>
                          View
                        </button>

                        <a href={p.visit} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[rgba(108,132,93,0.95)] text-white px-3 py-2 rounded-full text-xs transition">
                          Visit site <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-slate-900 font-semibold">{p.title}</h4>
                    <div className="flex gap-2">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{p.short}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Modal / Lightbox */}
        <AnimatePresence>
          {active !== null && (
            <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} transition={{ duration: 0.22 }} className="relative w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
                  <div className="flex items-start justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">{projects.find((x) => x.id === active)?.title}</h3>
                    <div className="flex items-center gap-2">
                      {/* <button onClick={() => redirectTo(projects.find((x) => x.id === active)?.visit)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(108,132,93,0.95)] text-white font-semibold hover:opacity-90 transition" aria-label="Visit site in current tab">
                        Visit site <FiExternalLink />
                      </button> */}

                      <button onClick={() => setActive(null)} className="p-2 rounded-md hover:bg-slate-100 transition" aria-label="Close">
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 flex items-center justify-center bg-slate-50">
                      <img src={projects.find((x) => x.id === active)?.img} alt="screenshot" className="w-full h-auto max-h-[60vh] object-cover rounded" />
                    </div>

                    <div className="p-6">
                      <h4 className="font-medium text-slate-900 mb-2">Overview</h4>
                      <p className="text-sm text-slate-600 mb-4">{projects.find((x) => x.id === active)?.short}</p>

                      <h5 className="text-sm font-semibold text-slate-800 mb-2">Tech stack</h5>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {projects.find((x) => x.id === active)?.tech.map((t) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full bg-slate-100">{t}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button onClick={() => setActive(null)} className="px-4 py-2 rounded-full border text-sm">Close</button>
                        {/* <a href={projects.find((x) => x.id === active)?.visit} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border text-sm">Open in new tab</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* backdrop */}
              <motion.div onClick={() => setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
