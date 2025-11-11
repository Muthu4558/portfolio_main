import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code, Palette, BarChart3, Layout, Video } from "lucide-react";
import Logo from "../assets/Dev.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll listener for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: showNavbar ? 0 : -100,
        opacity: showNavbar ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 70, damping: 12 }}
      className="fixed top-0 left-0 right-0 z-50 
      max-w-7xl mx-auto mt-4 px-6 md:px-12 py-4
      backdrop-blur-md rounded-2xl shadow-lg 
      flex items-center justify-between border border-black bg-white/80"
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <a href="#home">
          <img
            src={Logo}
            alt="Logo"
            className="h-14 object-contain drop-shadow-md cursor-pointer"
          />
        </a>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-10 text-lg font-semibold text-black relative">
        {[
          { name: "Home", path: "#home" },
          { name: "About", path: "#about" },
          { name: "Projects", path: "#projects" },
        ].map((item, idx) => (
          <motion.li
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="group cursor-pointer relative"
          >
            <a href={item.path}>
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Contact Button */}
      <motion.a
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(108,132,93,0.7)",
        }}
        whileTap={{ scale: 0.95 }}
        href="#contact"
        className="hidden md:block bg-[#6c845d]
        text-white font-semibold px-7 py-2 rounded-full shadow-md
        hover:text-white transition-all duration-300"
      >
        Contact
      </motion.a>

      {/* Mobile Toggle */}
      <div
        className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          className="block h-1 w-7 bg-black rounded"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="block h-1 w-7 bg-black rounded"
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          className="block h-1 w-7 bg-black rounded"
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-0 w-full bg-linear-to-br from-[#f0f3ec] via-[#d4e0c0] to-[#6c845d]
            backdrop-blur-sm flex flex-col items-center space-y-6 py-8 
            text-lg font-medium rounded-b-2xl shadow-xl border-l-0"
          >
            <motion.li whileHover={{ scale: 1.05 }}>
              <a href="#home">Home</a>
            </motion.li>

            <motion.li whileHover={{ scale: 1.05 }}>
              <a href="#about">About</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>
              <a href="#projects">Projects</a>
            </motion.li>

            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="bg-[#6c845d] text-white font-semibold px-7 py-2 rounded-full shadow-md 
              transition-all duration-300"
            >
              Contact
            </motion.a>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;