import { Hero } from "@/components/Hero";
import { ClientTypeSelector } from "@/components/ClientTypeSelector";
import { WorkShowcase } from "@/components/WorkShowcase";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ClientTypeSelector />
      <WorkShowcase />
      <ContactSection />
    </div>
  );
};

export default Index;
