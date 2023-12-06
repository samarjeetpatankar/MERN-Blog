import React from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import CTA from "./Cta";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
