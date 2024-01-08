import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Stepper({ step, onContinue }) {
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="flex gap-3">
      {/* Step 1 */}
      <div className="flex gap-1">
        {step === 1 ? (
          <div
            style={{ marginTop: "-5px" }}
            className="rounded-full w-8 h-8 text-black  bg-3243D5 flex items-center justify-center"
          >
            {" "}
            <p className="font-bold text-[20px]">1</p>
          </div>
        ) : (
          <FaCheckCircle style={{ color: "green", marginTop: "5px" }} />
        )}
        <p className="font-bold text-white text-[15px]">Prepare</p>
      </div>

      {/* Line between Step 1 and Step 2 */}
      <div className="w-[200px] mt-3  h-[2px] bg-gray-500 " />

      {/* Step 2 */}
      <div className="flex gap-1">
        {step === 2 ? (
          <div
            style={{ marginTop: "-5px" }}
            className="rounded-full w-8 h-8 text-black   bg-3243D5 flex items-center justify-center"
          >
            {" "}
            <p className="font-bold text-[20px]">2</p>
          </div>
        ) : step === 3 ? (
          <FaCheckCircle style={{ color: "green", marginTop: "5px" }} />
        ) : (
          <div className="rounded-full w-8 h-8 text-black bg-gray-600  flex items-center justify-center">
            {" "}
            <p className="font-bold text-[20px]">2</p>
          </div>
        )}
        <p className="font-bold text-white text-[15px]">Approve</p>
      </div>

      {/* Line between Step 2 and Step 3 */}
      <div className="w-[200px] mt-3  h-[2px] bg-gray-500 " />

      {/* Step 3 */}
      <div className="flex gap-1">
        {step === 3 ? (
          <div
            style={{ marginTop: "-5px" }}
            className="rounded-full w-8 h-8 text-black  bg-3243D5   flex items-center justify-center"
          >
            {" "}
            <p className="font-bold text-[20px]">3</p>
          </div>
        ) : step === 3 ? (
          <FaCheckCircle style={{ color: "green", marginTop: "5px" }} />
        ) : (
          <div className="rounded-full w-8 h-8 text-black bg-gray-600  flex items-center justify-center">
            {" "}
            <p className="font-bold text-[20px]">3</p>
          </div>
        )}
        <p className="font-bold text-white text-[15px]">Multisend</p>
      </div>
    </div>
  );
}
