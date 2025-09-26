"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  const bg =
    theme === "dark"
      ? "bg-gray-900 text-gray-300 border-gray-700"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <footer className={w-full mt-12 border-t ${bg}}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-extrabold gradient-text">🎓 SmartLearn Hub</h2>
          <p className="mt-2 text-sm">
            Empowering students with AI, notes, quizzes, and progress tracking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/notes" className="hover:underline">📘 Notes</Link></li>
            <li><Link href="/quiz" className="hover:underline">🧩 Quizzes</Link></li>
            <li><Link href="/ai-assistant" className="hover:underline">🤖 AI Assistant</Link></li>
            <li><Link href="/progress" className="hover:underline">📊 Progress</Link></li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div>
          <h3 className="font-semibold mb-2">Notice</h3>
          <p className="text-sm leading-relaxed">
            ⚠ Please avoid using <strong>dark mode</strong> while viewing charts 
            — some visuals may not be visible properly.
          </p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} SmartLearn Hub. All rights reserved.
      </div>
    </footer>
  );
}
