import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { content } from "../data/Content";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#1c2632] text-white px-4 sm:px-8 md:pl-16 py-4">
      <NavBar />
      <main className="mt-16 md:mt-20">
        <h1 className="font-grifter text-4xl md:text-5xl mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            {content.termsOfService.text}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TermsOfService;
