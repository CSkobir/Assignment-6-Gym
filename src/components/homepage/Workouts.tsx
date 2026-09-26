import React from "react";
import WorkoutLibrary from "./WorkoutLibrary";
import { IWorkout } from "@/types/workout.type";

const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

const Workouts = async () => {
  const workoutData = await getWorkouts();

  return (
    <section id="library" className="container mx-auto px-4 py-8 md:py-12 scroll-mt-20">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          The Library
        </h2>
        <p className="text-sm text-[#8e93a0]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <WorkoutLibrary workouts={workoutData} />
    </section>
  );
};

export default Workouts;