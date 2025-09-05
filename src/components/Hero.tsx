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

    </section>
  );
};