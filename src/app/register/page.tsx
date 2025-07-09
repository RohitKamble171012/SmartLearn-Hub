"use client";
import { useState } from "react";
import Link from "next/link";
import { useThemeClasses } from "@/hooks/useThemeClasses";

export default function RegisterPage() {
  const { bgColor, textColor, buttonGreen } = useThemeClasses();
  const [role, setRole] = useState<"student" | "teacher">("student");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    school: "",
    city: "",
    parentContact: "",
    standard: "",
    subject: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registered User:", { ...form, role });
    // 🔧 TODO: Send this data to your backend or MongoDB cluster
  };

  const handleGoogleLogin = () => {
    console.log("Google Auth triggered");
    // 🔧 TODO: Integrate Google OAuth
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${bgColor} ${textColor}`}>
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
          {role === "student" ? "🎓 Register as Student" : "👨‍🏫 Register as Teacher"}
        </h1>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              role === "teacher"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg mb-6 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
          Sign in with Gmail
        </button>

        {/* Common Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="school"
            placeholder="School / Institution"
            value={form.school}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
          />

          {/* Role-specific fields */}
          {role === "student" ? (
            <>
              <input
                type="tel"
                name="parentContact"
                placeholder="Parent's Contact Number"
                value={form.parentContact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                name="standard"
                placeholder="Class/Standard (e.g. 9th, 10th)"
                value={form.standard}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
              />
            </>
          ) : (
            <input
              type="text"
              name="subject"
              placeholder="Subjects You Teach"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
            />
          )}

          <button
            type="submit"
            className={`w-full ${buttonGreen} text-white font-semibold py-3 rounded-lg`}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already registered?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
