import React from "react";

function AutomaticSteps({ steps }) {
  return (
    <div className="relative flex flex-col w-full">
      {/* Vertical Timeline Line */}
      <div
        className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-[#F67C37] z-0"
        style={{ transform: "translateX(-50%)" }}
      />
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="relative flex flex-col md:flex-row items-center w-full mb-12"
        >
          {/* Step Number  */}
          <div
            className="hidden md:flex absolute left-1/2 z-10"
            style={{
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="bg-[#F67C37] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-base border-4 border-[#1c2632]">
              {idx + 1}
            </div>
          </div>
          {/* Left (Image) */}
          <div
            className={`flex justify-center w-full md:w-1/2 ${
              idx % 2 === 1 ? "md:order-2" : "md:order-1"
            }`}
          >
            <img
              src={step.img}
              alt={step.title}
              className="w-[200px] md:w-[300px] m-0"
            />
          </div>
          {/* Right (Text) */}
          <div
            className={`flex w-full md:w-1/2 items-center justify-center ${
              idx % 2 === 1 ? "md:order-1" : "md:order-2"
            }`}
          >
            <div className="bg-[#263040] rounded-lg p-6 min-w-[200px] max-w-md flex flex-col items-start gap-2 shadow-lg">
              <div className="md:hidden bg-[#F67C37] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mb-2">
                {idx + 1}
              </div>
              <h3 className="font-semibold mb-1 text-lg md:text-xl">
                {step.title}
              </h3>
              <p className="text-white/80 text-base md:text-lg font-light">
                {step.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AutomaticSteps;
