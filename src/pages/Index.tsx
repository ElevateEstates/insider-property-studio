import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkWithUs } from "@/components/WorkWithUs";
import { ContactPreview } from "@/components/ContactPreview";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <WorkWithUs />
      <ContactPreview />
      <ContactSection />
    </div>
  );
};

export default Index;
