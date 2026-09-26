"use client";
import React from "react";
import { IWorkout } from "@/types/workout.type";
import WorkoutCard from "@/components/shared/WorkoutCard";

interface IWorkoutLibraryProps {
  workouts: IWorkout[];
}

const WorkoutLibrary = ({ workouts }: IWorkoutLibraryProps) => {
  return (
    <div className="space-y-6">
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout: IWorkout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#282d3b] bg-[#12151d] py-16 text-center">
          <p className="text-lg font-bold text-white">
            No workouts found
          </p>

          <p className="mt-1 text-sm text-[#8e93a0]">
            There are no workouts available.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutLibrary;