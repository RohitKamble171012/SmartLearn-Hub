"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext"; // ⬅️ Import theme

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme(); // ⬅️ Use theme from context

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
     { name: "Notes", href: "/notes", icon: "📘" },
    { name: "Quiz", href: "/quiz", icon: "🧩" },
    { name: "AI Assistant", href: "/ai-assistant", icon: "🤖" },
    { name: "Progress", href: "/progress", icon: "📊" },
  ];

  // 🎨 Theme-based color classes
  const themeBg =
    theme === "dark"
      ? "bg-gray-900"
      : theme === "blue"
      ? "bg-blue-100"
      : theme === "purple"
      ? "bg-purple-100"
      : "bg-white";

  const themeText =
    theme === "dark"
      ? "text-cyan-300" // bright fancy blue
      : "text-gray-800";

  const shadowColor =
    theme === "dark"
      ? "shadow-purple-800/30"
      : "shadow-gray-300";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`w-full px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${themeBg} ${shadowColor} ${
        scrolled
          ? "border-gray-200/70 dark:border-gray-700/70"
          : "border-gray-200/50 dark:border-gray-700/50"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl"
          >
            🎓
          </motion.div>
          <span className={`text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            <span className="hidden sm:inline">SmartLearn Hub</span>
            <span className="sm:hidden">SmartLearn</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Link href={item.href}>
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium ${themeText}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login">
            <motion.button
              className="hidden md:block px-4 sm:px-6 py-2 rounded-xl border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all font-medium text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>

          <Link href="/register">
            <motion.button
              className="px-3 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Sign Up</span>
                <span className="sm:hidden">Join</span>
              </span>
            </motion.button>
          </Link>

          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <span className="text-xl sm:text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden ${themeBg} backdrop-blur-md mt-4 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50`}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link href={item.href}>
                    <motion.button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-left ${themeText}`}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
