import React from "react";
import Image from "next/image";
import body from "@/assets/banner.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <div className="relative overflow-hidden rounded-3xl border border-[#232733] bg-gradient-to-br from-[#141721] via-[#12151d] to-[#0e1017] p-6 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-center lg:text-left z-10">
            <span className="inline-block rounded-full bg-[#baff00]/10 border border-[#baff00]/30 px-3.5 py-1 text-xs font-bold tracking-wider text-[#baff00] uppercase">
              Workout Library
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
              Train With Intent. <br />
              <span className="text-[#baff00]">Log Every Set.</span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#9da1aa] mx-auto lg:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#library"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#baff00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-[#c8ff32] hover:shadow-lg hover:shadow-[#baff00]/20 active:scale-95"
              >
                <span>Browse Workouts</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/myplan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#2d3342] bg-[#161a24] px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#1e2330] hover:border-[#baff00]/40"
              >
                View My Plan
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-[#baff00]/10 blur-3xl pointer-events-none" />
            <div className="relative max-w-[420px] w-full transition-transform duration-500 hover:scale-105">
              <Image
                src={body}
                alt="FitLog Training Graphic"
                width={500}
                height={500}
                priority
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;