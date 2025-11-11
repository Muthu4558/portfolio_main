// Tools.jsx
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
    FaHtml5,
    FaCss3Alt,
    FaReact,
    FaNodeJs,
    FaDownload,
} from "react-icons/fa";
import {
    SiJavascript,
    SiExpress,
    SiMongodb,
    SiPostman,
    SiCanva,
} from "react-icons/si";
import { RiServerLine } from "react-icons/ri";

/**
 * Tools.jsx
 * - Creative Tools / Tech section for portfolio
 * - Uses TailwindCSS + framer-motion
 * - Interactive tilt on each card, entrance stagger, animated skill bars and micro-interactions
 *
 * Drop into your project and ensure:
 * npm i framer-motion react-icons
 */

const PRIMARY = "#6c845d";

const tools = [
    { name: "HTML", icon: <FaHtml5 size={20} />, color: "#E44D26", level: 95 },
    { name: "CSS", icon: <FaCss3Alt size={20} />, color: "#1572B6", level: 92 },
    { name: "JavaScript", icon: <SiJavascript size={18} />, color: "#F7DF1E", level: 90, dark: true },
    { name: "React", icon: <FaReact size={20} />, color: "#61DAFB", level: 92 },
    { name: "Express.js", icon: <SiExpress size={18} />, color: "#000000", level: 85 },
    { name: "Node.js", icon: <FaNodeJs size={18} />, color: "#3C873A", level: 88 },
    { name: "MongoDB", icon: <SiMongodb size={18} />, color: "#47A248", level: 86 },
    { name: "Postman", icon: <SiPostman size={18} />, color: "#FF6C37", level: 82 },
    { name: "REST API", icon: <RiServerLine size={18} />, color: "#0F172A", level: 87 },
    { name: "Canva", icon: <SiCanva size={18} />, color: "#00C4CC", level: 78 },
];

export default function Tools() {
    // refs and motion values for subtle background particle animation
    const wrapperRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        // tiny parallax on wrapper based on mouse
        const el = wrapperRef.current;
        if (!el) return;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const nx = (e.clientX - cx) / rect.width;
            const ny = (e.clientY - cy) / rect.height;
            x.set(nx * 12);
            y.set(ny * 12);
        };
        const onLeave = () => {
            x.set(0);
            y.set(0);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [x, y]);

    // animation variants
    const list = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
    };
    const item = {
        hidden: { opacity: 0, y: 8, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: "easeOut" } },
    };

    return (
        <section id="tools" className="py-16 relative">
            {/* Decorative accent big blob */}
            <motion.div
                style={{ translateX: x, translateY: y }}
                ref={wrapperRef}
                className="absolute -left-28 -top-20 w-96 h-96 rounded-3xl opacity-20 pointer-events-none"
                aria-hidden
            >
                <div
                    style={{
                        background: `radial-gradient(circle at 25% 25%, ${PRIMARY}40, transparent 45%)`,
                        filter: "blur(60px)",
                        width: "100%",
                        height: "100%",
                        borderRadius: "1rem",
                    }}
                />
            </motion.div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: PRIMARY }}>
                            <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ background: PRIMARY }}
                            />
                            Tools & Stack
                        </h3>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                            Technologies I use to build products
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 max-w-xl">
                            Focused, modern stack — from UI and styling to backend, databases and API tools. Clean, maintainable and production-ready.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow"
                            style={{ background: PRIMARY, color: "white" }}
                        >
                            Explore Projects
                        </a>
                        <a
                            href="/CV MERN.pdf"
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
                        >
                            <FaDownload /> CV
                        </a>
                    </div>
                </div>

                {/* Grid of tools */}
                <motion.ul
                    initial="hidden"
                    animate="show"
                    variants={list}
                    className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
                >
                    {tools.map((t, idx) => {
                        // small tilt values per card
                        const tiltX = useMotionValue(0);
                        const tiltY = useMotionValue(0);
                        const rotateX = useTransform(tiltY, [-20, 20], [8, -8]);
                        const rotateY = useTransform(tiltX, [-20, 20], [-8, 8]);

                        return (
                            <motion.li
                                key={t.name}
                                variants={item}
                                className="relative border rounded-2xl"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <motion.div
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
                                        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
                                        tiltX.set(nx);
                                        tiltY.set(ny);
                                    }}
                                    onMouseLeave={() => {
                                        tiltX.set(0);
                                        tiltY.set(0);
                                    }}
                                    style={{ rotateX, rotateY }}
                                    whileHover={{ scale: 1.03 }}
                                    className="group relative border border-slate-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-transform will-change-transform"
                                >
                                    {/* icon circle */}
                                    <div
                                        className="w-14 h-14 mb-3 rounded-lg flex items-center justify-center text-lg font-semibold"
                                        style={{
                                            background: t.color,
                                            color: t.dark ? "#111827" : "#fff",
                                            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                                        }}
                                    >
                                        {t.icon}
                                    </div>

                                    {/* name */}
                                    <div className="text-sm font-semibold text-slate-800">{t.name}</div>

                                    {/* animated level bar */}
                                    <div className="w-full mt-3">
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${t.level}%` }}
                                                transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 * idx }}
                                                className="h-full rounded-full"
                                                style={{
                                                    background: `linear-gradient(90deg, ${PRIMARY}, rgba(108,132,93,0.8))`,
                                                }}
                                                aria-hidden
                                            />
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">{t.level}% proficiency</div>
                                    </div>

                                    {/* subtle tooltip on hover (desktop) */}
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="text-xs bg-slate-900 text-white px-3 py-1 rounded-md shadow">
                                            {t.name} — {t.level}% ready
                                        </div>
                                    </div>

                                    {/* corner accent dot */}
                                    <div
                                        aria-hidden
                                        className="absolute -right-3 -top-3 w-8 h-8 rounded-full"
                                        style={{
                                            background: `conic-gradient(${t.color}, rgba(255,255,255,0))`,
                                            filter: "blur(10px)",
                                            opacity: 0.9,
                                        }}
                                    />
                                </motion.div>
                            </motion.li>
                        );
                    })}
                </motion.ul>

                {/* Footer / small praise line */}
                <div className="mt-6 text-sm text-slate-600">
                    <strong style={{ color: PRIMARY }}>Hiring managers</strong> — I build with maintainability and performance in mind.
                </div>
            </div>
        </section>
    );
}
