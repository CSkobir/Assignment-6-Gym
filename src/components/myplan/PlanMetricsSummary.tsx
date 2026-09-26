import React from "react";
import { IWorkout } from "@/types/workout.type";
import { Dumbbell, Clock, Flame } from "lucide-react";

interface IPlanMetricsSummaryProps {
  todayPlan: IWorkout[];
}

const PlanMetricsSummary = ({ todayPlan }: IPlanMetricsSummaryProps) => {
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  return (
    <div className="rounded-2xl border border-[#232733] bg-[#12151d] p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#232733]">
        {/* Exercises */}
        <div className="flex items-center gap-4 sm:justify-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#baff00]/10 border border-[#baff00]/20 text-[#baff00]">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#8e93a0]">
              Exercises
            </p>
            <p className="text-3xl font-black text-[#baff00]">
              {totalExercises}
              <span className="text-xs font-normal text-[#8e93a0] ml-1">/ 5 max</span>
            </p>
          </div>
        </div>

        {/* Minutes */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8 sm:justify-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#8e93a0]">
              Minutes
            </p>
            <p className="text-3xl font-black text-white">
              {totalMinutes}
              <span className="text-xs font-normal text-[#8e93a0] ml-1">min</span>
            </p>
          </div>
        </div>

        {/* Calories */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8 sm:justify-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#8e93a0]">
              Calories
            </p>
            <p className="text-3xl font-black text-white">
              {totalCalories}
              <span className="text-xs font-normal text-[#8e93a0] ml-1">kcal</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanMetricsSummary;
