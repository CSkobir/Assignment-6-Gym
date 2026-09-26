export interface IWorkout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface IPlanContext {
  todayPlan: IWorkout[];
  savedWorkouts: IWorkout[];
  completedWorkouts: number[];
  addToTodayPlan: (workout: IWorkout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  addToSaved: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;
  toggleComplete: (id: number) => void;
  isCompleted: (id: number) => boolean;
  isInTodayPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}
