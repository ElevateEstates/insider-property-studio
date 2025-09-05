export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Mission Statement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center transform -rotate-12 opacity-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wider text-white/80">
            HELPING AGENTS FIND BUYERS THROUGH CONTENT MARKETING IN COSTA DEL SOL.
          </h1>
        </div>
      </div>
    </section>
  );
};