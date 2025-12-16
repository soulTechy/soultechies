import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Moon, Sun, Calendar } from "lucide-react";

const PRIMARY = "#7c3bed";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80 }
  }
};

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative transition-colors duration-500 ${darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        }`}
    >
      {/* Dark Mode Toggle */}
      {/* <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg"
        style={{ backgroundColor: PRIMARY }}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? (
          <Sun className="text-white" size={20} />
        ) : (
          <Moon className="text-white" size={20} />
        )}
      </motion.button> */}

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Company Info */}
          <motion.div variants={item}>
            <h2 className="text-2xl font-bold text-white mb-3">
              Soul<span style={{ color: PRIMARY }}>Techies</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Transforming ideas into digital reality with clean, scalable and
              innovative solutions.
            </p>
            {/* Book Now CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md"
              style={{ backgroundColor: PRIMARY }}
            >
              <Calendar size={16} />
              Book Now
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item} className="space-y-3">
            <motion.a
              whileHover={{ x: 5 }}
              href="mailto:soulte3h@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${PRIMARY}20` }}
              >
                <Mail size={16} style={{ color: PRIMARY }} />
              </div>
              <span className="text-sm">Soulte3h@gmail.com</span>
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              href="tel:+15551234567"
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${PRIMARY}20` }}
              >
                <Phone size={16} style={{ color: PRIMARY }} />
              </div>
              <span className="text-sm">+91 7076 853 097 / +91 6289 549 477</span>
            </motion.a>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-gray-400"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${PRIMARY}20` }}
              >
                <MapPin size={16} style={{ color: PRIMARY }} />
              </div>
              <span className="text-sm">
                 Kolkata, West Bengal
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={item}
          className="border-t border-white/10 mt-8 pt-5 text-center"
        >
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} SoulTechies. All rights reserved.
          </p>


        </motion.div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />
    </motion.footer>
  );
};

export default Footer;
