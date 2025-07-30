import React from "react";
import { motion } from "framer-motion";

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function AutomaticSteps({ steps }) {
  return (
    <div className="relative flex flex-col w-full">
      <motion.div
        className="flex flex-col items-center mb-8 -mt-8 md:-mt-20"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center rounded-xl px-6 py-4 shadow-lg">
          Want to manage all your scripts{" "}
          <span className="text-[#37B5FE]">automatically?</span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto w-full">
        {/* Intro Card */}
        <motion.div
          className="bg-[#263040] border border-white/30 rounded-2xl p-6 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Title (Left) */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-white text-center md:text-left md:w-1/2">
            Say Hello to the{" "}
            <span className="text-[#37B5FE]">
              Active Script
              <br className="hidden md:inline" /> List (ASL)
            </span>
          </h2>
          {/* Description (Right) */}
          <p className="text-white/80 text-base md:text-lg font-light text-center md:text-right md:w-1/2">
            Also known as My Script List (MySL), ASL is a government-approved
            system
            <br className="hidden md:inline" />
            that pulls all your active scripts and repeats — both paper
            <br className="hidden md:inline" />
            and electronic into one easy-to-manage list.
          </p>
        </motion.div>
        {/* Timeline Line (starts after card) and steps */}
        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-[#37B5FE] z-0"
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
                <div className="bg-[#37B5FE] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-base border-4 border-[#1c2632]">
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
                  <div className="md:hidden bg-[#37B5FE] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mb-2">
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
      </div>
    </div>
  );
}

export default AutomaticSteps;
