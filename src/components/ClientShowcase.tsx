import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Instagram, TrendingUp, Users, Eye, MousePointer, Home, Award } from "lucide-react";
import eddiePortrait from "@/assets/eddie-portrait.jpg";
import eddieWork1 from "@/assets/eddie-work-1.jpg";
import eddieWork2 from "@/assets/eddie-work-2.jpg";
import eddieWork3 from "@/assets/eddie-work-3.jpg";
import wlCostaPortrait from "@/assets/wl-costa-portrait.jpg";
import wlCostaLogo from "@/assets/wl-costa-logo.png";
import wlWork1 from "@/assets/wl-work-1.jpg";
import wlWork2 from "@/assets/wl-work-2.jpg";
import wlWork3 from "@/assets/wl-work-3.jpg";

export const ClientShowcase = () => {
  const clients = [
    {
      id: 1,
      name: "Eddie Rodriguez",
      business: "Personal Trainer & Fitness Coach",
      description: "Eddie provides personalized fitness coaching and gym training through video calls and in-person sessions on the Costa del Sol.",
      image: eddiePortrait,
      badge: "Personal Trainer",
      testimonial: "The team completely transformed my online presence. My website looks incredible and the social media strategy has brought me more clients than I ever imagined. The professional photos and videos really showcase what I offer, and the results speak for themselves.",
      website: "https://trainwitheddie.es",
      workItems: [
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
      ],
      results: [
        { metric: "Website Visitors", value: "2,400+", icon: Eye },
        { metric: "Social Engagement", value: "150%", icon: TrendingUp },
        { metric: "Lead Conversions", value: "45+", icon: MousePointer },
        { metric: "New Followers", value: "800+", icon: Users }
      ]
    },
    {
      id: 2,
      name: "Warner & Sandra Laurie",
      business: "WL Costa Properties",
      description: "Exclusive real estate services specializing in luxury properties on the Costa del Sol.",
      image: wlCostaPortrait,
      logo: wlCostaLogo,
      badge: "Real Estate",
      testimonial: "Geir has been working with us for the past two years and has become a huge part of our real estate journey. Not only does he help us present our exclusive listings in the best possible way, but he also brings fresh energy, creative ideas, and a new perspective to everything we do. He's a cool guy with a brilliant creative brain, always thinking outside the box and encouraging us to push beyond our comfort zone. Geir's support means a lot to us, he's a true team player and someone we're genuinely grateful to work with. His work speaks for itself, and our clients are always seriously impressed.",
      website: "https://wlcostaproperties.net",
      workItems: [
        {
          id: 1,
          title: "Property Marketing",
          description: "Professional photography and virtual tours",
          image: wlWork1,
          type: "Photo & Video"
        },
        {
          id: 2,
          title: "Luxury Presentations",
          description: "Premium marketing materials and brochures",
          image: wlWork2,
          type: "Design & Branding"
        },
        {
          id: 3,
          title: "Digital Campaigns",
          description: "Targeted social media and website optimization",
          image: wlWork3,
          type: "Digital Marketing"
        }
      ],
      results: [
        { metric: "Properties Sold", value: "85+", icon: Home },
        { metric: "Client Satisfaction", value: "98%", icon: Award },
        { metric: "Market Reach", value: "300%", icon: TrendingUp },
        { metric: "Listing Views", value: "15K+", icon: Eye }
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Client Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Transforming <span className="text-gradient-gold">Businesses</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real clients who trusted us with their growth
            </p>
          </div>

          {clients.map((client, clientIndex) => (
            <div key={client.id} className={`mb-20 ${clientIndex > 0 ? 'pt-20 border-t border-border/30' : ''}`}>

              {/* Client Profile */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="animate-slide-in">
                  <div className="relative">
                    <img 
                      src={client.image}
                      alt={`${client.name}`}
                      className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 left-4 glass-effect text-white border-white/30"
                    >
                      {client.badge}
                    </Badge>
                    {client.logo && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                        <img 
                          src={client.logo}
                          alt={`${client.business} logo`}
                          className="h-8 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 animate-fade-up">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-3">
                      Meet {client.name.split(' ')[0]}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {client.description}
                    </p>
                  </div>

                  <div className="bg-secondary/30 rounded-2xl p-6 border-l-4 border-accent-gold">
                    <p className="text-lg italic text-foreground mb-4">
                      "{client.testimonial}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.business}</p>
                      </div>
                    </div>
                  </div>

                  <Button className="glass-button group">
                    Visit {client.business.includes('Properties') ? 'WL Costa Properties' : client.name.split(' ')[0] + "'s Website"}
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
                  {client.workItems.map((item, index) => (
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
                    {client.id === 1 ? '30-Day' : '2-Year'} <span className="text-gradient-gold">Results</span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {client.id === 1 ? 'Measurable impact within the first month of launch' : 'Long-term partnership results over two years'}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {client.results.map((result, index) => {
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
          ))}
        </div>
      </div>
    </section>
  );
};