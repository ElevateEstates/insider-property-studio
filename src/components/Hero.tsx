export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Mission Statement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center transform -rotate-12 opacity-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white">
            HELPING AGENTS FIND BUYERS
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mt-4">
            THROUGH CONTENT MARKETING
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mt-4">
            IN COSTA DEL SOL
          </h1>
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