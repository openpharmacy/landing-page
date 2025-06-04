import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/HomeLogo.png";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center py-4 lg:pr-16">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={Logo}
          alt="OpenPharmacy Logo"
          className="h-[40px] lg:h-[52px]"
        />
      </Link>
      <a
        href="mailto:hello@openpharmacy.com"
        className="bg-[#F67C37] text-white text-base lg:text-lg px-4 lg:px-7 py-1.5 lg:py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Contact
      </a>
    </nav>
  );
};

export default NavBar;
