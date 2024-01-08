"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import CSVViewer from "./CSVViewer";

export default function Multisend() {
  const [currentstep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    console.log("Handling continue...");
    if (currentstep === 1) {
      setCurrentStep(2);
    } else if (currentstep === 2) {
      setCurrentStep(3);
    }
  };
  return (
    <div className="bg-0b114c p-[20px] flex flex-col h-screen w-full  justify-center items-center">
      <div className="flex flex-col relative justify-center items-center gap-3">
        <Stepper Oncontinue={handleContinue} step={currentstep} />
        <div className="box">
          <CSVViewer step={currentstep} Oncontinue={handleContinue} />
        </div>
      </div>
    </div>
  );
}
