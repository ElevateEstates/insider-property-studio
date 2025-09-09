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

const Index = () => {
  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={0.3} />
      <Navigation />
      <Hero />
      <div className="content-background">
        <StatsSection />
        <PortfolioSection />
      </div>
      <div className="transparent-section">
        <About />
        <TestimonialsSection />
        <WorkWithUs />
      </div>
      <div className="content-background">
        <ContactPreview />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
