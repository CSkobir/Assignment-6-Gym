import React from "react";
import { IWorkout } from "@/types/workout.type";

interface IWorkoutSpecsProps {
  workout: IWorkout;
}

const WorkoutSpecs = ({ workout }: IWorkoutSpecsProps) => {
  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: `★ ${workout.rating}` },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#12151e]">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={`flex items-center justify-between px-4 py-3 text-xs ${
            index !== specs.length - 1 ? "border-b border-[#202532]" : ""
          }`}
        >
          <span className="font-bold tracking-wider text-[#7e8492] uppercase">
            {spec.label}
          </span>
          <span className="font-semibold text-[#e1e4eb]">{spec.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSpecs;
