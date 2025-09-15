import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Video, Award, Users, Box, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import geirPortrait from "@/assets/eddie-portrait.jpg";
const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const services = [{
    icon: Camera,
    title: "Real Estate Photography",
    description: "Professional photography using advanced HDR blending and color correcting techniques that showcases properties in their best light, capturing every detail that matters to potential buyers."
  }, {
    icon: Video,
    title: "Professional Video Tours",
    description: "Cinematic video tours that vividly showcase each property's unique features and location, highlighting distinct value propositions through dynamic FPV and drone footage, paired with expert editing and color grading to the highest standard."
  }, {
    icon: Award,
    title: "Marketing Package",
    description: "Maximize leads and conversions with marketing packages that include long and short format social media content, virtual staging, 360 tour, floor plan, landing page and branded materials for real estate professionals."
  }, {
    icon: Users,
    title: "Image Building Package",
    description: "Strengthen your Costa del Sol real estate brand with professional content that documents your already successful business and lifestyle. Our expertly crafted videos and social media assets highlight your achievements and unique aesthetic, fostering consistent audience engagement for long-term image building and trust."
  }, {
    icon: Box,
    title: "3D Work",
    description: "Bring your property's potential to life with photorealistic 3D renders. Collaborating with top industry specialists, we create stunning, true-to-vision environments based on your specifications, showcasing the full potential of your project."
  }, {
    icon: UserCheck,
    title: "Personal Branding",
    description: "Elevate your Costa del Sol presence with social media-focused personal branding. We create tailored video content and social media assets, paired with consistent posting strategies, to engage your audience, build trust, and establish your reputation as a market leader."
  }];
  const stats = [{
    number: "500+",
    label: "Properties Captured"
  }, {
    number: "50+",
    label: "Happy Clients"
  }, {
    number: "5M+",
    label: "Views Generated"
  }, {
    number: "95%",
    label: "Client Retention"
  }];
  return <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} reduced={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center transparent-section">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-20 py-32" style={{
        transform: `translateY(${scrollY * 0.1}px)`
      }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
                Meet Geir Stint, your reliable content <span className="text-accent-gold">wizard</span>.
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                With over 8 years of experience in professional media creation in wide variety of sectors, he brings the expertise in creating 
                visual content that doesn't just showcase properties—it sells dreams and lifestyles.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portfolio">
                  <Button className="glass-button">
                    View Portfolio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="glass-button">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src={geirPortrait} alt="Geir Stint - Professional Content Creator" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      

      {/* Philosophy Section */}
      <section className="py-32 transparent-section">
        <div className="container mx-auto max-w-5xl px-4 md:px-8" style={{
        transform: `translateY(${scrollY * 0.02}px)`
      }}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-light mb-4 text-white">
              Our Philosophy
            </h2>
            <div className="w-20 h-0.5 bg-accent-gold mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent-gold to-transparent opacity-60"></div>
            <div className="pl-12 space-y-8">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 italic">
                "We've built our reputation on over-delivering—and we won't stop now."
              </p>
              
              <div className="space-y-6 text-lg leading-relaxed text-white/80 max-w-4xl">
                <p>
                  In the competitive Costa del Sol real estate market—where thousands of agents compete for the same buyers—standout visuals are essential, not optional. With collaboration platforms giving every agent access to nearly every listing, the question isn't simply who arranges the viewing.
                </p>
                
                <p>
                  What truly sets you apart is <em className="text-white font-medium">you</em>: your personality, your competence, your proven track record, and your ability to build trust.
                </p>
                
                <p>
                  In a landscape where anyone can present attractive listing photos, our role is not only to make properties shine, but to position you as the professional clients can rely on to deliver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 transparent-section">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-20" style={{
        transform: `translateY(${scrollY * 0.03}px)`
      }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-white">
              Our Expertise
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We combine creative vision with technical excellence to deliver 
              media that elevates your real estate business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => <Card key={index} className="glass-card p-8 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      <section className="py-16 transparent-section">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="glass-button">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default About;