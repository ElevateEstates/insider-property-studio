import heroImage from "@/assets/hero-costa-del-sol.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-6 tracking-wide">
            YOUR <span className="text-blue-400">LUXURY</span>
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-8 tracking-wide">
            EXCLUSIVE BESPOKE PARTNER.
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 max-w-3xl mx-auto">
            Luxury real estate media to impress
          </h2>
        </div>
      </div>
    </section>
  );
};