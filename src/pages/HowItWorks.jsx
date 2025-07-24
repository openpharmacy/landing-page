import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { easySteps, manualSteps, automaticSteps } from "../data/HowItWorks";
import ManualSteps from "../components/ManualSteps";
import AutomaticSteps from "../components/AutomaticSteps";
import CallToAction from "../components/CallToAction";

function HowItWorks() {
  const [selectedMethod, setSelectedMethod] = useState("manual");
  const currentSteps =
    selectedMethod === "manual" ? manualSteps : automaticSteps;

  return (
    <Layout>
      <main className="flex flex-col gap-8 md:gap-12">
        {/* 3 Easy Steps Section */}
        <section className="w-full flex flex-col items-center mb-6">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-10 text-center font-grifter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            3 Easy Steps to Get Started
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
            {easySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#263040] rounded-2xl p-6 flex-1 min-w-[220px] max-w-xs text-center shadow-lg flex flex-col items-center"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {idx + 1}. {step.title}
                </h2>
                <p className="text-white/80 text-base font-light mb-4">
                  {step.desc}
                </p>
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-lg w-32 h-32 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </section>
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center font-grifter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          2 Ways to see the prescription
        </motion.h1>
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8 md:mb-20 text-lg">
          <div className="bg-[#263040] rounded-full p-1 flex">
            <button
              onClick={() => setSelectedMethod("manual")}
              className={`px-5 py-2 text-base md:px-8 md:py-3 md:text-lg rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedMethod === "manual"
                  ? "bg-white text-[#1c2632] shadow-lg"
                  : "text-white hover:text-gray-300"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setSelectedMethod("automatic")}
              className={`px-5 py-2 text-base md:px-8 md:py-3 md:text-lg rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedMethod === "automatic"
                  ? "bg-white text-[#1c2632] shadow-lg"
                  : "text-white hover:text-gray-300"
              }`}
            >
              Automatic
            </button>
          </div>
        </div>

        {/* Steps Section */}
        {selectedMethod === "manual" ? (
          <ManualSteps steps={currentSteps} />
        ) : (
          <AutomaticSteps steps={currentSteps} />
        )}

        <CallToAction />
      </main>
    </Layout>
  );
}

export default HowItWorks;
