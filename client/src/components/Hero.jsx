// Hero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import MyPic from "../assets/muthu.png"; // ← replace with your actual image path

const PRIMARY = "#6c845d"; // navbar color

const AnimatedTypewriter = ({ text, speed = 60 }) => {
    const [display, setDisplay] = useState("");
    useEffect(() => {
        let i = 0;
        let mounted = true;
        const tick = () => {
            if (!mounted) return;
            if (i <= text.length) {
                setDisplay(text.slice(0, i));
                i++;
                setTimeout(tick, speed);
            }
        };
        tick();
        return () => {
            mounted = false;
        };
    }, [text, speed]);

    return <span className="whitespace-nowrap">{display}</span>;
};

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center py-20 relative overflow-hidden mt-8"
        >
            {/* Gradient background accents */}
            <div
                className="absolute -left-32 top-0 w-96 h-96 rounded-full opacity-25 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${PRIMARY}33, transparent 70%)`,
                    filter: "blur(50px)",
                }}
            />
            <div
                className="absolute -right-32 bottom-0 w-96 h-96 rounded-full opacity-25 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${PRIMARY}44, transparent 70%)`,
                    filter: "blur(60px)",
                }}
            />

            <div className="max-w-7xl mx-auto w-full px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
                    {/* Left Text Section */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="inline-flex items-center gap-2 text-sm font-medium mb-4"
                            style={{ color: PRIMARY }}
                        >
                            <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ background: PRIMARY }}
                            />
                            Hello There 👋
                        </p>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                            I'm{" "}
                            <span
                                style={{
                                    color: PRIMARY,
                                }}
                            >
                                Muthu
                            </span>
                        </h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-3 text-lg sm:text-xl text-slate-700"
                        >
                            <AnimatedTypewriter text="Web Developer (Frontend, MERN)" />
                        </motion.h2>

                        <p className="mt-4 text-slate-600 max-w-lg">
                            I specialize in building fast, interactive, and visually appealing
                            web experiences using modern web technologies. Let’s create
                            something amazing together.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="/CV MERN.pdf"
                                download
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full text-white font-semibold shadow-md transition-transform hover:-translate-y-1"
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

                        {/* Socials */}
                        <div className="mt-8 flex items-center gap-4">
                            <a
                                href="https://github.com/Muthu4558"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white rounded-full shadow hover:scale-110 transition-transform"
                            >
                                <FaGithub className="text-slate-800" />
                            </a>
                            <a
                                href="https://linkedin.com/in/muthu-v-a74583275/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white rounded-full shadow hover:scale-110 transition-transform"
                            >
                                <FaLinkedin className="text-slate-800" />
                            </a>
                            <a
                                href="mailto:muthu03072003@gmail.com"
                                className="p-3 bg-white rounded-full shadow hover:scale-110 transition-transform"
                            >
                                <FaEnvelope className="text-slate-800" />
                            </a>

                        </div>
                    </motion.div>

                    {/* Right Image Section */}
                    <motion.div
                        className="lg:col-span-5 flex justify-center relative"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Glowing Circle Behind Image */}
                        <div
                            className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full opacity-30 blur-2xl"
                            style={{ backgroundColor: PRIMARY }}
                        ></div>

                        {/* Profile Image */}
                        <motion.img
                            src={MyPic}
                            alt="Muthu"
                            className="relative w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-full shadow-2xl border-4 border-white"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 right-8 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3"
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;