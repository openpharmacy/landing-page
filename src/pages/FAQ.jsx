import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Layout from "../components/Layout";
import faqData from "../data/FaqData";

const categories = Object.keys(faqData);

function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const [openQuestions, setOpenQuestions] = useState([]);

  const currentFaqs = faqData[selectedCategory];

  const handleMobileQuestionClick = (idx) => {
    setOpenQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleDesktopQuestionClick = (idx) => {
    setSelectedQuestion(idx);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedQuestion(0);
    setOpenQuestions([]);
  };

  return (
    <Layout>
      <h1 className="font-grifter text-4xl md:text-5xl font-bold text-center lg:text-left ml-3">
        FAQs
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Section */}
        <div className="lg:w-1/2 w-full">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`inline-block px-4 py-2 rounded-full text-sm lg:text-base transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#37B5FE] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-2 px-2">
            {currentFaqs.map((faq, idx) => (
              <div key={idx}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`border-b border-white/20 pb-2 cursor-pointer hover:bg-white/5 rounded-lg px-3 py-2 transition-colors text-base lg:text-lg ${
                    selectedQuestion === idx ? "bg-white/10" : ""
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      handleMobileQuestionClick(idx);
                    } else {
                      handleDesktopQuestionClick(idx);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">{faq.q}</span>
                    <span className="text-white/60">›</span>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {openQuestions.includes(idx) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="block lg:hidden bg-[#263040] rounded-xl p-3 my-2 overflow-hidden"
                    >
                      <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 mt-14 hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#263040] rounded-xl p-4 h-fit"
            >
              <p className="text-white/80 leading-relaxed text-lg">
                {currentFaqs[selectedQuestion]?.a}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

export default FAQ;
