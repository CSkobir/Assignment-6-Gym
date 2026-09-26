import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/workout.type";
import { Clock, Flame, Star } from "lucide-react";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#232733] bg-[#13161f] text-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#baff00]/50 hover:shadow-xl hover:shadow-[#baff00]/5"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#1a1e29]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Muscle Group Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups?.map((group, idx) => (
            <span
              key={idx}
              className="rounded-full bg-[#baff00] px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-black uppercase"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-black uppercase tracking-wide text-white transition-colors group-hover:text-[#baff00] line-clamp-1">
          {workout.name}
        </h3>

        {/* Equipment / Category */}
        <p className="mt-1 text-xs text-[#8e93a0] line-clamp-1">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-[#232733]" />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-[#9da1aa]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#baff00]" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-white">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;