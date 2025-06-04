import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-6 md:mt-8 py-4">
      <div className="flex items-center text-center flex-col md:flex-row justify-between">
        <div className="order-2 md:order-1 mb-4 md:mb-0">
          <p className="mt-4 text-xs md:text-sm text-white/60">
            Copyright © 2025 Easy As Health Pty Ltd. All Rights Reserved.
          </p>
        </div>
        <div className="order-1 md:order-2 flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto items-center lg:pr-16">
          <Link
            to="/privacy-policy"
            className="text-sm md:text-base text-white/80 hover:text-white transition-opacity text-center w-full md:w-auto"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-sm md:text-base text-white/80 hover:text-white transition-opacity text-center w-full md:w-auto"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
