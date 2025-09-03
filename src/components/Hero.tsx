export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Mission Statement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center transform -rotate-12 opacity-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-white">
            OUR MISSION IS TO
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-white mt-4">
            CREATE & ELEVATE
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-white mt-4">
            COSTA DEL SOL
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-white mt-4">
            BUSINESSES
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            geir / costa del sol
          </h2>
        </div>
      </div>

      {/* Side Contact */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 -rotate-90 z-20">
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3">
          <a 
            href="mailto:hello@costadelsolservices.com" 
            className="text-white font-medium tracking-wide hover:opacity-80 transition-opacity"
          >
            hello@costadelsolservices.com
          </a>
        </div>
      </div>
    </section>
  );
};