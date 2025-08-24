import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Instagram, TrendingUp, Users, Eye, MousePointer } from "lucide-react";
import eddiePortrait from "@/assets/eddie-portrait.jpg";
import eddieWork1 from "@/assets/eddie-work-1.jpg";
import eddieWork2 from "@/assets/eddie-work-2.jpg";
import eddieWork3 from "@/assets/eddie-work-3.jpg";

export const ClientShowcase = () => {
  const workItems = [
    {
      id: 1,
      title: "Landing Page Design",
      description: "Custom landing page with conversion optimization",
      image: eddieWork2,
      type: "Web Development"
    },
    {
      id: 2,
      title: "Professional Content",
      description: "High-quality photos and landing page video",
      image: eddieWork1,
      type: "Photo & Video"
    },
    {
      id: 3,
      title: "Social Media Campaigns",
      description: "Instagram ads and content strategy",
      image: eddieWork3,
      type: "Digital Marketing"
    }
  ];

  const results = [
    { metric: "Website Visitors", value: "2,400+", icon: Eye },
    { metric: "Social Engagement", value: "150%", icon: TrendingUp },
    { metric: "Lead Conversions", value: "45+", icon: MousePointer },
    { metric: "New Followers", value: "800+", icon: Users }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Client Success Story
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Transforming <span className="text-gradient-gold">Eddie's Business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we helped a personal trainer build his online presence and grow his client base
            </p>
          </div>

          {/* Client Profile */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in">
              <div className="relative">
                <img 
                  src={eddiePortrait}
                  alt="Eddie - Personal Trainer"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 glass-effect text-white border-white/30"
                >
                  Personal Trainer
                </Badge>
              </div>
            </div>

            <div className="space-y-6 animate-fade-up">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  Meet Eddie
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Eddie provides personalized fitness coaching and gym training through video calls and in-person sessions on the Costa del Sol.
                </p>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-6 border-l-4 border-accent-gold">
                <p className="text-lg italic text-foreground mb-4">
                  "The team completely transformed my online presence. My website looks incredible and the social media strategy has brought me more clients than I ever imagined. The professional photos and videos really showcase what I offer, and the results speak for themselves."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Eddie Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Personal Trainer & Fitness Coach</p>
                  </div>
                </div>
              </div>

              <Button className="btn-hero group">
                Visit Eddie's Website
                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* What We Did */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We <span className="text-gradient-gold">Created</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A complete digital transformation including website, content, and marketing strategy
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {workItems.map((item, index) => (
                <Card 
                  key={item.id}
                  className="card-luxury overflow-hidden border-0 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-accent-gold">
                        {item.type}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                30-Day <span className="text-gradient-gold">Results</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Measurable impact within the first month of launch
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <Card 
                    key={index}
                    className="card-luxury text-center p-6 border-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-accent-gold" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {result.value}
                    </div>
                    <div className="text-muted-foreground">
                      {result.metric}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};