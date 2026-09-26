import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface IEmptyPlanStateProps {
  tab: "today" | "saved";
}

const EmptyPlanState = ({ tab }: IEmptyPlanStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#232733] bg-[#12151d] py-16 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#181c26] text-[#baff00] mb-4">
        <Dumbbell className="h-8 w-8 stroke-[1.5]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white">
        Nothing Here Yet
      </h3>

      <p className="mt-2 max-w-md text-xs sm:text-sm text-[#8e93a0]">
        {tab === "today"
          ? "Browse our library and add a lift to your daily chart. Train hard, stay consistent."
          : "You haven't saved any workouts for later yet. Explore lifts and bookmark your favorites."}
      </p>

      <Link
        href="/workout"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#baff00] px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-[#c8ff32] hover:shadow-lg hover:shadow-[#baff00]/20 active:scale-95"
      >
        <span>Go to workouts</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default EmptyPlanState;
