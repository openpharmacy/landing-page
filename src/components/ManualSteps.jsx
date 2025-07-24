import React from "react";

function ManualSteps({ steps }) {
  return (
    <div className="flex flex-col gap-4 md:gap-2">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`w-full flex flex-col md:flex-row ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center mb-16 md:mb-24`}
        >
          {/* text box */}
          <div
            className={`w-full md:w-1/2 flex justify-center ${
              idx % 2 === 1 ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <div className="bg-[#263040] rounded-lg p-6 px-8 md:p-6 md:px-12 min-w-[160px] md:min-w-[200px] max-w-xl flex gap-4 md:gap-8 items-start shadow-lg">
              <div className="bg-[#F67C37] text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-semibold mb-1 md:mb-2 text-lg md:text-xl">
                  {step.title}
                </h3>
                <p className="text-white/80 text-base md:text-lg font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
          {/* Image */}
          <div
            className={`w-full md:w-1/2 flex justify-center mt-6 md:-mt-24 ${
              idx % 2 === 1 ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <img
              src={step.img}
              alt={step.title}
              className="w-[140px] md:w-[350px] m-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManualSteps;
