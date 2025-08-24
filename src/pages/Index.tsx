import { Hero } from "@/components/Hero";
import { ClientTypeSelector } from "@/components/ClientTypeSelector";
import { WorkShowcase } from "@/components/WorkShowcase";
import { ContactPreview } from "@/components/ContactPreview";
import { ClientShowcase } from "@/components/ClientShowcase";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ClientTypeSelector />
      <WorkShowcase />
      <ContactPreview />
      <ClientShowcase />
      <ContactSection />
    </div>
  );
};

export default Index;
