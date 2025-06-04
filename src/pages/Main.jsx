import React, { useState } from "react";
import AppStore from "../assets/Appstore.png";
import GooglePlay from "../assets/GooglePlay.png";
import PhoneImage from "../assets/iPhone 14.png";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ComingSoonPopup from "../components/ComingSoonPopup";
import { content } from "../data/Content";

function Main() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStoreClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1c2632] text-white px-4 sm:px-8 md:px-16 md:pr-0 py-4">
      <NavBar />

      <main className="mt-16 md:mt-20">
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
            <h1 className="font-grifter text-4xl md:text-7xl leading-tight font-semibold mb-8 md:mb-20">
              {content.heading.line1}
              <br />
              {content.heading.line2}
            </h1>
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
          <div className="hidden md:flex md:flex-1/2 justify-end items-start -mt-24">
            <img
              src={PhoneImage}
              alt="OpenPharmacy App Interface"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </main>

      <ComingSoonPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default Main;
