// About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaDownload } from "react-icons/fa";
import MyPic from "../assets/muthu.png"; // ← replace with your actual image path

const PRIMARY = "#6c845d";

export default function About() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Decorative Blurs */}
            <div
                className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
                style={{ background: PRIMARY }}
            />
            <div
                className="absolute bottom-10 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
                style={{ background: PRIMARY }}
            />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Image Section */}
                    <motion.div
                        className="lg:col-span-5 flex justify-center"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative group">
                            <div
                                className="absolute -inset-1 rounded-3xl transition-all duration-500 group-hover:scale-105"
                                style={{
                                    background: `radial-gradient(circle at 10% 10%, ${PRIMARY}22, transparent 35%)`,
                                    filter: "blur(30px)",
                                }}
                            />
                            <img
                                src={MyPic}
                                alt="Muthu V"
                                className="relative rounded-3xl w-64 h-64 object-cover shadow-2xl border-4 border-white"
                            />

                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-5 -right-5 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3"
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                                    style={{ backgroundColor: PRIMARY }}
                                >
                                    M
                                </div>
                                <p className="text-sm font-semibold text-slate-700">
                                    Web Developer
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: PRIMARY }}>
                            <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ background: PRIMARY }}
                            />
                            About Me
                        </h3>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
                            Muthu V — Web Developer
                        </h2>

                        <p className="mt-4 text-slate-700 max-w-xl leading-relaxed">
                            I’m a passionate <strong>Frontend & MERN Stack Developer</strong> who loves creating clean,
                            dynamic, and user-friendly digital experiences. I focus on crafting
                            scalable applications with React, Node, Express, and MongoDB — ensuring
                            every project I build delivers performance and style.
                        </p>

                        {/* Contact Icons */}
                        <div className="mt-6 flex gap-4">
                            <motion.a
                                href="tel:6385931500"
                                className="p-3 rounded-full bg-[rgba(108,132,93,0.08)] text-slate-700 hover:scale-110 transition-transform"
                                style={{ color: PRIMARY }}
                                whileHover={{ y: -3 }}
                                title="Call Me"
                            >
                                <FaPhoneAlt size={18} />
                            </motion.a>

                            <motion.a
                                href="mailto:muthu03072003@gmail.com"
                                className="p-3 rounded-full bg-[rgba(108,132,93,0.08)] text-slate-700 hover:scale-110 transition-transform"
                                style={{ color: PRIMARY }}
                                whileHover={{ y: -3 }}
                                title="Send Email"
                            >
                                <FaEnvelope size={18} />
                            </motion.a>

                            <motion.a
                                href="https://github.com/Muthu4558"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-[rgba(108,132,93,0.08)] text-slate-700 hover:scale-110 transition-transform"
                                style={{ color: PRIMARY }}
                                whileHover={{ y: -3 }}
                                title="GitHub Profile"
                            >
                                <FaGithub size={18} />
                            </motion.a>

                            <motion.a
                                href="https://linkedin.com/in/muthu-v-a74583275/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-[rgba(108,132,93,0.08)] text-slate-700 hover:scale-110 transition-transform"
                                style={{ color: PRIMARY }}
                                whileHover={{ y: -3 }}
                                title="LinkedIn Profile"
                            >
                                <FaLinkedin size={18} />
                            </motion.a>
                        </div>

                        {/* Skill Badges */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {[
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "React",
                                "Node.js",
                                "Express.js",
                                "MongoDB",
                                "REST API",
                                "Postman",
                                "Canva",
                            ].map((skill) => (
                                <motion.span
                                    key={skill}
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="/CV MERN.pdf"
                                download
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                                style={{ backgroundColor: PRIMARY }}
                            >
                                <FaDownload /> Download CV
                            </a>
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 bg-white text-slate-800 font-semibold shadow hover:-translate-y-1 transition-transform"
                            >
                                View Projects
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
