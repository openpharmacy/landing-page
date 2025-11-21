import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, noRightPadding = false }) => (
  <div className="min-h-screen bg-[var(--color-primary)] text-white py-4">
    <NavBar noRightPadding={noRightPadding} />
    <main className="mt-12 md:mt-20 max-w-7xl mx-auto flex flex-col gap-12 md:gap-16 px-4 sm:px-8 md:px-2">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
