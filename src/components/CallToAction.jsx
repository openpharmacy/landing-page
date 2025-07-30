import React, { useState } from "react";
import AppStore from "../assets/Appstore.png";
import GooglePlay from "../assets/GooglePlay.png";
import ComingSoonPopup from "./ComingSoonPopup";

const CallToAction = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStoreClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <section className="text-center pb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to simplify your prescriptions?
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Download <span className="text-[#37B5FE]">OpenPharmacy</span> today!
      </p>
      <div className="flex justify-center gap-4">
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
      <ComingSoonPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
};

export default CallToAction;
