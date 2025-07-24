import React, { useState } from "react";
import AppStore from "../assets/Appstore.png";
import GooglePlay from "../assets/GooglePlay.png";
import PhoneImage from "../assets/iPhone 14.png";
import Layout from "../components/Layout";
import ComingSoonPopup from "../components/ComingSoonPopup";
import { content } from "../data/MainContent";
import { motion } from "framer-motion";

function Main() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStoreClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#1c2632] text-white">
      <motion.img
        src={PhoneImage}
        alt="OpenPharmacy App Interface"
        className="hidden md:block absolute top-36 right-0 h-[710px] z-10"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 0, y: 80, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.1, 0.2, 1] }}
      />
      <Layout noRightPadding>
        <div className="relative w-full">
          <div className="hidden md:flex md:items-center md:gap-3 mb-6 md:mb-10">
            <span className="bg-[#F67C37] font-extralight px-2 md:px-3.5 py-1 rounded-3xl text-xs md:text-sm">
              v1.01
            </span>
            <span className="font-sans font-extralight text-sm md:text-base">
              Announcing our new product
            </span>
            <span className="text-xs md:text-sm font-extralight">⟩</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-2">
            <div className="w-full md:flex-1/2 text-center md:text-left">
              <motion.h1
                className="font-grifter text-4xl md:text-7xl leading-tight font-semibold mb-8 md:mb-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0.1, 0.2, 1] }}
              >
                {content.heading.line1}
                <br />
                {content.heading.line2}
              </motion.h1>
              <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8 max-w-[600px] mx-auto md:mx-0">
                {content.description.text}
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="#"
                  onClick={handleStoreClick}
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src={AppStore}
                    alt="Download on the App Store"
                    className="h-12 md:h-14"
                  />
                </a>
                <a
                  href="#"
                  onClick={handleStoreClick}
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src={GooglePlay}
                    alt="Get it on Google Play"
                    className="h-12 md:h-14"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <ComingSoonPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </Layout>
    </div>
  );
}

export default Main;
