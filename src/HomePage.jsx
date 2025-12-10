import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Reviews from "./Components/Reviews";
import Services from "./Components/Services";
import Footer from "./Components/Footer";
import ContactDetails from "./Components/ContactDetails";
import ContactFormModal from "./Components/ContactFormModal";
import Clients from "./Components/Clients";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Clients />
      <Reviews />
      <Services />
      <ContactFormModal />
      <ContactDetails />
      <Footer />
    </div>
  );
};

export default HomePage;
