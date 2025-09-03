import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkWithUs } from "@/components/WorkWithUs";
import { ClientShowcase } from "@/components/ClientShowcase";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <WorkWithUs />
      <ClientShowcase />
      <ContactSection />
    </div>
  );
};

export default Index;
