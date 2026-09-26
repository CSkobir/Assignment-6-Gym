import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/workout.type";
import { Clock, Flame, Star, Check, X, Plus } from "lucide-react";

interface IPlanItemCardProps {
  workout: IWorkout;
  isTodayPlan: boolean;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onRemove: () => void;
  onAddToToday?: () => void;
}

const PlanItemCard = ({
  workout,
  isTodayPlan,
  isCompleted = false,
  onToggleComplete,
  onRemove,
  onAddToToday,
}: IPlanItemCardProps) => {
  return (
    <div
      className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition-all ${
        isCompleted
          ? "border-emerald-500/30 bg-[#0d1217] opacity-80"
          : "border-[#232733] bg-[#12151d] hover:border-[#2f3545]"
      }`}
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative h-20 w-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-[#181c26] border border-[#232733]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="112px"
            className="object-cover"
          />
          {isCompleted && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#baff00]" />
            </div>
          )}
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`text-base font-black uppercase tracking-wide truncate ${
                isCompleted ? "line-through text-[#8e93a0]" : "text-white"
              }`}
            >
              {workout.name}
            </h4>
            {isCompleted && (
              <span className="shrink-0 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">
                Done
              </span>
            )}
          </div>

          <p className="text-xs text-[#8e93a0] truncate">
            {workout.equipment} • {workout.muscleGroups?.join(", ")}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#9da1aa] pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#baff00]" />
              {workout.duration}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#232733]">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-xl border border-[#2d3342] bg-[#161a24] px-3.5 py-2 text-xs font-semibold text-[#d0d3da] hover:bg-[#1f2432] hover:text-white transition whitespace-nowrap"
        >
          View Details
        </Link>

        {isTodayPlan && onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition whitespace-nowrap ${
              isCompleted
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                : "bg-[#baff00] text-black hover:bg-[#c8ff32] shadow-sm shadow-[#baff00]/20"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
          </button>
        )}

        {!isTodayPlan && onAddToToday && (
          <button
            onClick={onAddToToday}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#baff00] px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-[#c8ff32] transition whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add to Today</span>
          </button>
        )}

        <button
          onClick={onRemove}
          title="Remove from plan"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2d3342] bg-[#161a24] text-[#8e93a0] hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PlanItemCard;
