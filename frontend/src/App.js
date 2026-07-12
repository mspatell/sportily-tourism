import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import Grain from "@/components/sections/Grain";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Ribbon from "@/components/sections/Ribbon";
import Services from "@/components/sections/Services";
import FeaturedEvents from "@/components/sections/FeaturedEvents";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <Ribbon />
        <Services />
        <FeaturedEvents />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}

export default App;
