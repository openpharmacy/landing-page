import React from "react";
import AppStore from "../assets/AppStore.png";
import GooglePlay from "../assets/GooglePlay.png";

const CallToAction = () => {
  return (
    <section className="text-center pb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to simplify your prescriptions?
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Download{" "}
        <span className="text-[var(--color-accent)]">OpenPharmacy</span> today!
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://apps.apple.com/au/app/openpharmacy/id6751562406"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-opacity"
        >
          <img
            src={AppStore}
            alt="Download on the App Store"
            className="h-12 md:h-14"
          />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-opacity"
        >
          <img
            src={GooglePlay}
            alt="Get it on Google Play"
            className="h-12 md:h-14"
          />
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
