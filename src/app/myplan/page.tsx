import React, { Suspense } from "react";
import MyPlanContent from "@/components/myplan/MyPlanContent";

const MyPlanPage = () => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-sm text-[#8e93a0]">
          Loading your workout plan...
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
};

export default MyPlanPage;
