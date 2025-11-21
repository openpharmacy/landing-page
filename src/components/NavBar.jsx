import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/HomeLogo.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full bg-[var(--color-primary)]">
      <div
        className={
          "max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-8 md:px-2"
        }
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="OpenPharmacy Logo"
            className="h-[40px] lg:h-[52px]"
          />
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex gap-12">
            <Link
              to="/"
              className="text-white/80 hover:text-white text-base lg:text-lg transition-opacity"
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="text-white/80 hover:text-white text-base lg:text-lg transition-opacity"
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              className="text-white/80 hover:text-white text-base lg:text-lg transition-opacity"
            >
              FAQ
            </Link>
          </div>
        </div>
        {/* Desktop Contact button */}
        <a
          href="mailto:hello@openpharmacy.com"
          className="hidden md:block bg-[var(--color-accent)] text-white text-base lg:text-lg px-4 lg:px-7 py-1.5 lg:py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Contact
        </a>
        {/* Hamburger icon (mobile only) */}
        <button
          className="md:hidden ml-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor">
            <path
              d="M4 7h20M4 14h20M4 21h20"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
          menuOpen ? "bg-black/60" : "pointer-events-none bg-transparent"
        }`}
        style={{ transitionProperty: "background-color" }}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div
          className={`bg-[var(--color-primary)] w-64 h-full p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="self-end mb-4"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor">
              <path
                d="M6 6l16 16M6 22L22 6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg py-1"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg py-1"
          >
            How It Works
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg py-1"
          >
            FAQ
          </Link>
          {/* Mobile Contact button directly below FAQ */}
          <a
            href="mailto:hello@openpharmacy.com"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--color-accent)] text-white text-base px-4 py-2 rounded-full hover:opacity-90 transition-opacity w-full text-center"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
