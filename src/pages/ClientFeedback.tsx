import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, TrendingUp } from "lucide-react";
import wlCostaLogo from "@/assets/wl-costa-logo.png";
import wlCostaPortrait from "@/assets/wl-costa-portrait.jpg";

const ClientFeedback = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-gradient-gold">
              Client Feedback
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Real testimonials from our valued clients who have experienced significant growth through our content marketing services.
            </p>
          </div>

          {/* WL Costa Properties Section */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={wlCostaLogo} alt="WL Costa Properties" className="h-16 w-auto" />
                    <div>
                      <h3 className="text-2xl font-semibold text-white">WL Costa Properties</h3>
                      <p className="text-white/60 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Premium Real Estate - Costa del Sol
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-light/20 border border-accent-gold/20 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent-gold text-accent-gold" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-white/90 leading-relaxed mb-6">
                      "Geir has been working with us for the past two years and has become a huge part of our real estate journey. Not only does he help us present our exclusive listings in the best possible way, but he also brings fresh energy, creative ideas, and a new perspective to everything we do."
                    </blockquote>
                    <blockquote className="text-lg text-white/90 leading-relaxed mb-6">
                      "He's a cool guy with a brilliant creative brain, always thinking outside the box and encouraging us to push beyond our comfort zone. Geir's support means a lot to us, he's a true team player and someone we're genuinely grateful to work with. His work speaks for itself, and our clients are always seriously impressed."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <img 
                        src={wlCostaPortrait} 
                        alt="Warner and Sandra Laurie" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">Warner and Sandra Laurie</p>
                        <p className="text-accent-gold text-sm">Founders, Directors of WL Costa Properties</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <img 
                    src={wlCostaPortrait} 
                    alt="WL Costa Properties Team" 
                    className="w-full h-auto rounded-2xl shadow-luxury"
                  />
                </div>
              </div>

              {/* 2-Year Results */}
              <div className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 mb-12">
                <h4 className="text-3xl font-light mb-8 text-center text-accent-gold">
                  2-Year Partnership Results
                </h4>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-white/10 border-accent-gold/20 p-6 text-center">
                    <TrendingUp className="h-12 w-12 text-accent-gold mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">250%</div>
                    <div className="text-white/80">Increase in Premium Listing Inquiries</div>
                  </Card>
                  <Card className="bg-white/10 border-accent-gold/20 p-6 text-center">
                    <Users className="h-12 w-12 text-accent-gold mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">150+</div>
                    <div className="text-white/80">Exclusive Properties Marketed</div>
                  </Card>
                  <Card className="bg-white/10 border-accent-gold/20 p-6 text-center">
                    <Star className="h-12 w-12 text-accent-gold mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">98%</div>
                    <div className="text-white/80">Client Satisfaction Rate</div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedback;