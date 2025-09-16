import { Navigation } from "@/components/Navigation";
import { ClientShowcase } from "@/components/ClientShowcase";
import { Footer } from "@/components/Footer";

const GetNewLeads = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-gradient-gold">
              Get New Leads
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See how we've helped real estate professionals transform their business through strategic content marketing and lead generation.
            </p>
          </div>
        </div>
        <ClientShowcase />
      </div>
      <Footer />
    </div>
  );
};

export default GetNewLeads;