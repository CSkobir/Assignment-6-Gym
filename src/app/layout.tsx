import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PlanProvider from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Gym Companion",
  description: "A dark, high-output, no-nonsense gym companion app to browse exercises, curate your daily plan, and track fitness volume in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0c10] text-[#e1e4ea] selection:bg-[#baff00] selection:text-black">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#161922",
                color: "#fff",
                border: "1px solid #282e3c",
                borderRadius: "12px",
                fontSize: "13px",
              },
              success: {
                iconTheme: {
                  primary: "#baff00",
                  secondary: "#000",
                },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
