import "../styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import ThemeDrawer from "../components/ThemeDrawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SmartLearn Hub - AI-Powered Learning Platform",
  description: "Personalized AI-powered learning that adapts to your pace and helps you grow smarter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <Navbar />

          <main className="flex-grow relative z-10">
            {children}
          </main>

          <ThemeDrawer />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
