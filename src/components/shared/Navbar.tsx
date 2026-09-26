"use client";

import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname.startsWith("/myplan");

  const links = (
    <>
      <li>
        <Link
          href="/workout"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWorkoutsActive
              ? "bg-[#1f242d] text-[#baff00] font-semibold"
              : "text-[#9da1aa] hover:text-white"
          }`}
        >
          Workouts
        </Link>
      </li>
      <li>
        <Link
          href="/myplan"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isMyPlanActive
              ? "bg-[#1f242d] text-[#baff00] font-semibold"
              : "text-[#9da1aa] hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#1c202a]">
      <div className="navbar container mx-auto px-4 py-3">
        {/* Left: Brand */}
        <div className="navbar-start flex items-center gap-3">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-[#9da1aa] lg:hidden mr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#13161e] border border-[#252a36] rounded-2xl z-50 mt-3 w-52 p-3 shadow-xl space-y-1"
            >
              {links}
            </ul>
          </div>

          <Link href="/workout" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <Image
                src={logo}
                alt="FitLog Logo"
                width={26}
                height={26}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1 bg-[#12151c] p-1.5 rounded-full border border-[#222734]">
            {links}
          </ul>
        </div>

        {/* Right: Badges */}
        <div className="navbar-end flex items-center gap-2.5">
          <Link
            href="/myplan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151821] border border-[#262c3a] text-xs font-semibold text-[#c8cbd2] hover:border-[#baff00]/50 transition-colors"
          >
            <span>Plan</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#baff00] text-black font-extrabold text-[11px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/myplan?tab=saved"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151821] border border-[#262c3a] text-xs font-semibold text-[#c8cbd2] hover:border-white/30 transition-colors"
          >
            <span>Saved</span>
            <span className="text-xs font-bold text-[#8e93a0]">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
