import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const PRIMARY = "#7c3bed"; // primary color
const PRIMARY_TEXT = "#ffffff";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center rounded-full mt-1">
      <motion.div
        animate={{
          width: scrolled ? "80%" : "100%",
          borderRadius: scrolled ? "40px" : "0px",
          paddingTop: scrolled ? "10px" : "16px",
          paddingBottom: scrolled ? "10px" : "16px",

          // 👉 Fully solid primary color (no transparency)
          backgroundColor: PRIMARY,

          // 👉 No blur
          backdropFilter: "none",

          boxShadow: scrolled
            ? "0 6px 20px rgba(0,0,0,0.25)"
            : "0px 0px 0px rgba(0,0,0,0)",

          y: scrolled ? -4 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="px-6"
      >
        {/* Navbar content */}
        <div className="flex justify-between items-center p-1">
          <h1
            className="text-xl md:text-2xl font-semibold"
            style={{ color: PRIMARY_TEXT }}
          >
            SoulTechies
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8" style={{ color: PRIMARY_TEXT }}>
            {["Home", "Services", "Projects"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="transition"
                style={{ color: PRIMARY_TEXT }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ color: PRIMARY_TEXT }}
          >
            {!open ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                stroke={PRIMARY_TEXT}
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                stroke={PRIMARY_TEXT}
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-20 w-[90%] rounded-2xl py-4 md:hidden shadow-xl"
            style={{
              backgroundColor: PRIMARY, // solid primary color (no transparency)
            }}
          >
            {["Home", "Services", "Projects"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block text-lg px-6 py-3 rounded-xl transition"
                style={{ color: PRIMARY_TEXT }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
