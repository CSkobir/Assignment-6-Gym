"use client";

import React from "react";
import { IWorkout } from "@/types/workout.type";
import { usePlan } from "@/context/PlanContext";
import { Plus, Check, Bookmark, BookmarkCheck } from "lucide-react";

interface IWorkoutActionButtonsProps {
  workout: IWorkout;
}

const WorkoutActionButtons = ({ workout }: IWorkoutActionButtonsProps) => {
  const { addToTodayPlan, removeFromTodayPlan, addToSaved, removeFromSaved, isInTodayPlan, isSaved } = usePlan();

  const inToday = isInTodayPlan(workout.id);
  const inSaved = isSaved(workout.id);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
      {/* Add / Remove from Today's Plan */}
      {inToday ? (
        <button
          onClick={() => removeFromTodayPlan(workout.id)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#baff00]/50 bg-[#baff00]/10 px-5 py-3 text-xs font-black uppercase tracking-wider text-[#baff00] hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 transition"
        >
          <Check className="w-4 h-4 text-[#baff00]" />
          <span>In Today&apos;s Plan (Click to Remove)</span>
        </button>
      ) : (
        <button
          onClick={() => addToTodayPlan(workout)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#baff00] px-5 py-3 text-xs font-black uppercase tracking-wider text-black hover:bg-[#c8ff32] hover:shadow-lg hover:shadow-[#baff00]/20 active:scale-95 transition"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add to today&apos;s plan</span>
        </button>
      )}

      {/* Save / Remove from Saved */}
      {inSaved ? (
        <button
          onClick={() => removeFromSaved(workout.id)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2d3342] bg-[#161a24] px-5 py-3 text-xs font-bold text-[#baff00] hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 transition"
        >
          <BookmarkCheck className="w-4 h-4 text-[#baff00]" />
          <span>Saved</span>
        </button>
      ) : (
        <button
          onClick={() => addToSaved(workout)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2d3342] bg-[#161a24] px-5 py-3 text-xs font-bold text-white hover:bg-[#1e2330] hover:border-white/30 transition"
        >
          <Bookmark className="w-4 h-4 text-[#8e93a0]" />
          <span>Save for later</span>
        </button>
      )}
    </div>
  );
};

export default WorkoutActionButtons;
