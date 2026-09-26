import React from "react";

interface IWorkoutInstructionsProps {
  instructions: string[];
}

const WorkoutInstructions = ({ instructions }: IWorkoutInstructionsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-black tracking-widest text-white uppercase">
        Instructions
      </h3>

      <ol className="space-y-2.5 text-xs text-[#9da1aa] leading-relaxed">
        {instructions?.map((step, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 font-bold text-[#baff00]">
              {idx + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkoutInstructions;
