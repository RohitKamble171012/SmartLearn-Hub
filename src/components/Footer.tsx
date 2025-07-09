// src/components/Footer.tsx
"use client";
import Link from "next/link";
import { useThemeClasses } from "@/hooks/useThemeClasses";

export default function Footer() {
  const { bgColor, textColor } = useThemeClasses();

  return (
    <footer className={`${bgColor} ${textColor} border-t border-gray-300 dark:border-gray-700 py-8`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">SmartLearn Hub</h2>
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} SmartLearn Hub. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col sm:flex-row gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/quiz" className="hover:underline">
            Quiz
          </Link>
          <Link href="/ai-assistant" className="hover:underline">
            AI Assistant
          </Link>
          <Link href="/forum" className="hover:underline">
            Forum
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </footer>
  );
}
