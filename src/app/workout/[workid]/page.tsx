import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IWorkout } from "@/types/workout.type";
import WorkoutSpecs from "@/components/workoutDetails/WorkoutSpecs";
import WorkoutInstructions from "@/components/workoutDetails/WorkoutInstructions";
import WorkoutActionButtons from "@/components/workoutDetails/WorkoutActionButtons";
import { ArrowLeft } from "lucide-react";

interface IWorkoutDetailsPageProps {
  params: Promise<{
    workid: string;
  }>;
}

const getWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }

    // Fallback
    const allRes = await fetch("https://api.abcz.workers.dev/api/fitlog");
    if (allRes.ok) {
      const allWorkouts: IWorkout[] = await allRes.json();
      return allWorkouts.find((w) => String(w.id) === String(id)) || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching workout details:", error);
    return null;
  }
};

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { workid } = await params;
  const workout = await getWorkout(workid);

  if (!workout) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Workout Not Found</h2>
        <p className="mt-2 text-sm text-[#8e93a0]">
          The exercise you are looking for does not exist or was moved.
        </p>
        <Link
          href="/workout"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/workout"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8e93a0] hover:text-[#baff00] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl border border-[#232733] bg-[#12151e] shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
              {workout.name}
            </h1>
            <p className="text-sm leading-relaxed text-[#9da1aa] max-w-2xl">
              {workout.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="rounded-full bg-[#baff00] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-black uppercase"
              >
                {group}
              </span>
            ))}
          </div>
          <WorkoutSpecs workout={workout} />
          <WorkoutInstructions instructions={workout.instructions} />
          <WorkoutActionButtons workout={workout} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
