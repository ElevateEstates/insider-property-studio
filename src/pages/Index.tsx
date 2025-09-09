import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { About } from "@/components/About";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WorkWithUs } from "@/components/WorkWithUs";
import { ContactPreview } from "@/components/ContactPreview";
import { ContactSection } from "@/components/ContactSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      {/* Full-page parallax background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/0425939a-50c2-4776-81ad-2721b48c4585.png)`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Gradient overlay for readability */}
      <div className="fixed inset-0 z-5 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
      
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <div className="transparent-section">
          <StatsSection />
          <PortfolioSection />
        </div>
        <div className="transparent-section">
          <About />
          <TestimonialsSection />
          <WorkWithUs />
        </div>
        <div className="transparent-section">
          <ContactPreview />
          <ContactSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
