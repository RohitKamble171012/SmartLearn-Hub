"use client";
import { useState } from "react";
import Link from "next/link";
import { useThemeClasses } from "@/hooks/useThemeClasses";

export default function LoginPage() {
  const { bgColor, textColor } = useThemeClasses();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
    // TODO: Call backend API
  };

  const handleGoogleLogin = () => {
    console.log("Trigger Google Auth here");
    // TODO: Integrate Google Auth using NextAuth
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} ${textColor}`}>
      <div className="p-8 rounded-xl shadow-xl w-full max-w-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          🔐 Login
        </h1>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg mb-6 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
          Sign in with Gmail
        </button>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
