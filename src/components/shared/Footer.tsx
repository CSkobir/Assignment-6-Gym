import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#1e222b] bg-[#0a0c10] text-[#8e93a0] mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-white font-black tracking-wider text-base hover:opacity-80 transition">
          <Image src={logo} alt="FitLog Logo" width={22} height={22} className="object-contain" />
          <span>FITLOG</span>
        </Link>
        <p className="text-xs text-[#8e93a0] text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
