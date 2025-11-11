// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PRIMARY = "#6c845d";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      {/* Animated 404 text */}
      <motion.h1
        className="text-7xl sm:text-9xl font-extrabold text-gray-900"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Page not found.
      </motion.h2>

      <p className="mt-3 text-gray-500 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-full text-white font-semibold shadow-md transition-transform"
          style={{ backgroundColor: PRIMARY }}
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Decorative illustration */}
      <motion.svg
        className="mt-12 w-64 sm:w-80"
        viewBox="0 0 500 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <path
          d="M20 150 Q150 50 280 150 T480 150"
          stroke={PRIMARY}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        <circle cx="250" cy="150" r="12" fill={PRIMARY} opacity="0.6">
          <animateMotion dur="4s" repeatCount="indefinite" path="M20 150 Q150 50 280 150 T480 150" />
        </circle>
      </motion.svg>
    </div>
  );
};

export default NotFound;