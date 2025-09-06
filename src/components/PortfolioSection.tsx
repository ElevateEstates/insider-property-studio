import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

export const PortfolioSection = () => {
  const portfolioImages = [
    { src: portfolio1, alt: "Luxury property exterior view" },
    { src: portfolio2, alt: "Modern interior living space" },
    { src: portfolio3, alt: "Stunning property landscape" },
    { src: portfolio1, alt: "Luxury property exterior view" },
    { src: portfolio2, alt: "Modern interior living space" },
    { src: portfolio3, alt: "Stunning property landscape" }
  ];

  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            Grow your business with our real estate photography and videography.
          </h2>
          <p className="text-xl text-white/80 mb-12">
            An immersive way to experience real estate.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {portfolioImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg aspect-[3/2]">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-white">
            This is the pinnacle of real estate media.
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Discover the world of what real estate media was meant to be. Our work speaks for itself.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Our Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};