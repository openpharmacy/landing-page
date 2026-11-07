import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-6 md:mt-20 py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-2 px-4 sm:px-8 md:px-2">
        <div className="flex flex-row gap-4 md:gap-8 mb-2">
          <Link
            to="/privacy-policy"
            className="text-sm md:text-base text-white/80 hover:text-white transition-opacity"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-sm md:text-base text-white/80 hover:text-white transition-opacity"
          >
            Terms of Use
          </Link>
        </div>
        <div>
          <p className="text-xs md:text-sm text-white/60">
            Copyright © 2025 Easy As Health Pty Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
