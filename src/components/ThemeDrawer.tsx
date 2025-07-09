"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const themes = [
  { name: "light", color: "#f3f4f6", emoji: "☀️", gradient: "from-yellow-400 to-orange-500" },
  { name: "dark", color: "#1f2937", emoji: "🌙", gradient: "from-gray-700 to-gray-900" },
  { name: "blue", color: "#3b82f6", emoji: "🌊", gradient: "from-blue-400 to-blue-600" },
  { name: "purple", color: "#8b5cf6", emoji: "🔮", gradient: "from-purple-400 to-purple-600" },
  { name: "green", color: "#10b981", emoji: "🌿", gradient: "from-green-400 to-green-600" },
  { name: "pink", color: "#ec4899", emoji: "🌸", gradient: "from-pink-400 to-pink-600" },
];

export default function ThemeDrawer() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Enhanced Floating Button */}
      <motion.button
        className="fixed right-6 bottom-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full shadow-2xl"
        onClick={() => setOpen(!open)}
        title="Change Theme"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: open ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="text-2xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🎨
        </motion.span>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Slide-out Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-40 p-6 flex flex-col gap-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎨 Choose Your Vibe
              </h2>
              <motion.button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xl">✕</span>
              </motion.button>
            </div>

            {/* Theme Options */}
            <div className="space-y-3">
              {themes.map((t, index) => (
                <motion.button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name as any);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                    theme === t.name
                      ? "bg-gradient-to-r " + t.gradient + " text-white shadow-lg"
                      : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="text-3xl"
                    animate={{
                      rotate: theme === t.name ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: 1,
                      repeat: theme === t.name ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    {t.emoji}
                  </motion.div>
                  
                  <div className="flex-1 text-left">
                    <div className="capitalize font-semibold text-lg">
                      {t.name} Mode
                    </div>
                    <div className={`text-sm opacity-75 ${
                      theme === t.name ? "text-white" : "text-gray-600 dark:text-gray-400"
                    }`}>
                      {t.name === "light" && "Bright & Clean"}
                      {t.name === "dark" && "Easy on Eyes"}
                      {t.name === "blue" && "Ocean Vibes"}
                      {t.name === "purple" && "Mystical Feel"}
                      {t.name === "green" && "Nature Fresh"}
                      {t.name === "pink" && "Playful Energy"}
                    </div>
                  </div>
                  
                  {theme === t.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white text-xl"
                    >
                      ✓
                    </motion.div>
                  )}
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${t.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </motion.button>
              ))}
            </div>

            {/* Fun Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                🌟 Pro Tip
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Different themes can help you focus better during different times of the day!
              </p>
            </motion.div>

            {/* Theme Preview */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                🎪 Theme Preview
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((t) => (
                  <motion.div
                    key={`preview-${t.name}`}
                    className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.gradient} relative overflow-hidden cursor-pointer`}
                    onClick={() => setTheme(t.name as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === t.name && (
                      <motion.div
                        className="absolute inset-0 border-2 border-white rounded-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}