"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import PlanMetricsSummary from "./PlanMetricsSummary";
import PlanItemCard from "./PlanItemCard";
import EmptyPlanState from "./EmptyPlanState";
import { ArrowUpDown } from "lucide-react";

const MyPlanContent = () => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "today";

  const [activeTab, setActiveTab] = useState<"today" | "saved">(initialTab);
  const [sortBy, setSortBy] = useState<"default" | "duration" | "calories" | "rating">("default");

  const {
    todayPlan,
    savedWorkouts,
    completedWorkouts,
    removeFromTodayPlan,
    removeFromSaved,
    addToTodayPlan,
    toggleComplete,
  } = usePlan();

  useEffect(() => {
    if (searchParams.get("tab") === "saved") {
      setActiveTab("saved");
    }
  }, [searchParams]);

  const displayedList = useMemo(() => {
    const list = activeTab === "today" ? [...todayPlan] : [...savedWorkouts];

    if (sortBy === "duration") {
      list.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "calories") {
      list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTab, todayPlan, savedWorkouts, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          My Plan
        </h1>
        <p className="text-sm text-[#8e93a0]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <PlanMetricsSummary todayPlan={todayPlan} />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "today"
                  ? "bg-[#baff00] text-black shadow-md shadow-[#baff00]/20"
                  : "bg-[#141721] border border-[#232733] text-[#8e93a0] hover:text-white"
              }`}
            >
              Today&apos;s Plan ({todayPlan.length})
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "saved"
                  ? "bg-[#baff00] text-black shadow-md shadow-[#baff00]/20"
                  : "bg-[#141721] border border-[#232733] text-[#8e93a0] hover:text-white"
              }`}
            >
              Saved ({savedWorkouts.length})
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-4 h-4 text-[#8e93a0]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "duration" | "calories" | "rating")}
              className="select select-sm rounded-xl border-[#252a36] bg-[#12151d] text-xs text-white focus:border-[#baff00] focus:outline-none"
            >
              <option value="default">Sort by: Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {displayedList.length > 0 ? (
          <div className="space-y-4">
            {displayedList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                isTodayPlan={activeTab === "today"}
                isCompleted={completedWorkouts.includes(workout.id)}
                onToggleComplete={() => toggleComplete(workout.id)}
                onRemove={() =>
                  activeTab === "today"
                    ? removeFromTodayPlan(workout.id)
                    : removeFromSaved(workout.id)
                }
                onAddToToday={() => addToTodayPlan(workout)}
              />
            ))}
          </div>
        ) : (
          <EmptyPlanState tab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default MyPlanContent;
