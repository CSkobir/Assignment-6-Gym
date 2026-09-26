"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IPlanContext, IWorkout } from "@/types/workout.type";
import toast from "react-hot-toast";

export const PlanContext = createContext<IPlanContext>({
  todayPlan: [],
  savedWorkouts: [],
  completedWorkouts: [],
  addToTodayPlan: () => false,
  removeFromTodayPlan: () => {},
  addToSaved: () => {},
  removeFromSaved: () => {},
  toggleComplete: () => {},
  isCompleted: () => false,
  isInTodayPlan: () => false,
  isSaved: () => false,
});

export const usePlan = () => useContext(PlanContext);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved_workouts");
      const storedCompleted = localStorage.getItem("fitlog_completed_workouts");

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedWorkouts(JSON.parse(storedCompleted));
    } catch (e) {
      console.error("Failed to load fitlog data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to persist today's plan", e);
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_saved_workouts", JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Failed to persist saved workouts", e);
    }
  }, [savedWorkouts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        "fitlog_completed_workouts",
        JSON.stringify(completedWorkouts)
      );
    } catch (e) {
      console.error("Failed to persist completed workouts", e);
    }
  }, [completedWorkouts, isLoaded]);

  const isInTodayPlan = (id: number) => {
    return todayPlan.some((w) => w.id === id);
  };

  const isSaved = (id: number) => {
    return savedWorkouts.some((w) => w.id === id);
  };

  const isCompleted = (id: number) => {
    return completedWorkouts.includes(id);
  };

  const addToTodayPlan = (workout: IWorkout): boolean => {
    if (isInTodayPlan(workout.id)) {
      toast("Already added to Today's Plan", { icon: "ℹ️" });
      return false;
    }

    if (todayPlan.length >= 5) {
      toast.error("Daily cap reached! Maximum 5 lifts allowed for today.");
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    toast.success(`"${workout.name}" added to Today's Plan!`);
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    const workout = todayPlan.find((w) => w.id === id);
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
    setCompletedWorkouts((prev) => prev.filter((wId) => wId !== id));
    if (workout) {
      toast(`Removed "${workout.name}" from Today's Plan`, { icon: "🗑️" });
    }
  };

  const addToSaved = (workout: IWorkout) => {
    if (isSaved(workout.id)) {
      toast("Already in your Saved list", { icon: "ℹ️" });
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success(`"${workout.name}" saved for later!`);
  };

  const removeFromSaved = (id: number) => {
    const workout = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));
    if (workout) {
      toast(`Removed "${workout.name}" from Saved list`, { icon: "🗑️" });
    }
  };

  const toggleComplete = (id: number) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts((prev) => prev.filter((wId) => wId !== id));
      toast("Marked as incomplete", { icon: "↩️" });
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);
      toast.success("Lift completed! Great job! 💪");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        addToTodayPlan,
        removeFromTodayPlan,
        addToSaved,
        removeFromSaved,
        toggleComplete,
        isCompleted,
        isInTodayPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
