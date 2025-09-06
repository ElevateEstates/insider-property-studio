const testimonials = [
  {
    quote: "The best in the business! I highly recommend to everyone to use you. There is simply no one better than you! Your videos have grown my social media in a big way!",
    author: "Rob Thomson",
    company: "Waterfront Properties"
  },
  {
    quote: "We've had the pleasure of working with Geir on a few luxury properties, and are always very impressed by his attention to detail, crispness of the photos, and other marks of a professional luxury photographer.",
    author: "Anne LoGiudice", 
    company: "Luxury Home Magazine"
  },
  {
    quote: "I can't speak highly enough of this team. If you are looking to elevate your business, this is the team for you! This is a full service cinema grade production crew that will wow you with their results.",
    author: "Curtis Bennett",
    company: "Coldwell Banker"
  },
  {
    quote: "Geir went above and beyond, turning the experience into an exceptional one. His meticulous approach sets him apart from other photographers, ensuring a level of quality and perfection that is truly outstanding.",
    author: "Melanie Barre",
    company: "Sothebys International Realty"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            What our discerning clients are saying...
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <blockquote className="text-lg text-white/90 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-white/20 pt-4">
                <div className="text-white font-medium">{testimonial.author}</div>
                <div className="text-blue-400 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};