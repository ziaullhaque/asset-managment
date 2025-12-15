import React from "react";
import Container from "../../components/Shared/Container/Container";
import Hero from "../../components/Home/Hero/Hero";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Features from "../../components/Home/Features/Features";
import Packages from "../../components/Home/Packages/Packages";
import ContactHero from "../../components/Home/Contact/ContactHero";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import Faq from "../../components/Home/Faq/Faq";
// import HRRoute from "../../routes/HRRoute";

const Home = () => {
  return (
    <div>
      <Container>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <HRRoute></HRRoute> */}
        <Packages />
        <ContactHero />
        <Testimonials />
        <Faq />
      </Container>
    </div>
  );
};

export default Home;
