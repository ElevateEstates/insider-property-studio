import { Hero } from "@/components/Hero";
import { ClientTypeSelector } from "@/components/ClientTypeSelector";
import { WorkShowcase } from "@/components/WorkShowcase";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ClientTypeSelector />
      <WorkShowcase />
      <ContactForm />
    </div>
  );
};

export default Index;
