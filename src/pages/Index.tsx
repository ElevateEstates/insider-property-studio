import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { About } from "@/components/About";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WorkWithUs } from "@/components/WorkWithUs";
import { ContactPreview } from "@/components/ContactPreview";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <StatsSection />
      <PortfolioSection />
      <About />
      <TestimonialsSection />
      <WorkWithUs />
      <ContactPreview />
      <ContactSection />
    </div>
  );
};

export default Index;
