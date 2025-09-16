import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Calculator, Plus, Minus, MessageCircle } from "lucide-react";

interface ServiceOption {
  id: string;
  category: string;
  name: string;
  description: string;
  apartmentPrice: number;
  villaPrice: number;
  subOptions?: {
    id: string;
    name: string;
    description: string;
  }[];
}

interface PropertyType {
  id: string;
  name: string;
  multiplier: number;
}

const propertyTypes: PropertyType[] = [
  { id: "apartment", name: "Apartment", multiplier: 1 },
  { id: "villa", name: "Villa", multiplier: 1.18 } // ~18% increase for villas
];

const serviceOptions: ServiceOption[] = [
  {
    id: "photo-25",
    category: "Photography",
    name: "Up to 25 Professional Photos",
    description: "HDR photography, interior & exterior shots",
    apartmentPrice: 275,
    villaPrice: 350
  },
  {
    id: "photo-35",
    category: "Photography", 
    name: "Up to 35 Professional Photos",
    description: "Extended photo package with more angles",
    apartmentPrice: 325,
    villaPrice: 400
  },
  {
    id: "photo-50",
    category: "Photography",
    name: "Up to 50 Professional Photos",
    description: "Complete photo coverage of the property",
    apartmentPrice: 425,
    villaPrice: 550
  },
  {
    id: "24h-editing",
    category: "Photography",
    name: "24-Hour Rush Editing",
    description: "Express editing service for urgent deadlines",
    apartmentPrice: 99,
    villaPrice: 99
  },
  {
    id: "video-basic",
    category: "Video",
    name: "Basic Video Tour (1 minute)",
    description: "Perfect for social media, idealista, webpages or messaging platforms",
    apartmentPrice: 150,
    villaPrice: 200,
    subOptions: [
      { 
        id: "vertical", 
        name: "Vertical Format", 
        description: "For socials and messaging platforms" 
      },
      { 
        id: "horizontal", 
        name: "Horizontal Format", 
        description: "For webpages, idealista, youtube, etc." 
      }
    ]
  },
  {
    id: "video-cinematic",
    category: "Video",
    name: "Cinematic Video Package (up to 1 minute)",
    description: "Professional editing with drone footage",
    apartmentPrice: 350,
    villaPrice: 450
  },
  {
    id: "drone-video",
    category: "Drone",
    name: "Drone Video",
    description: "Aerial cinematic footage (flying can be done for urbanisation with approval from community admin - client must request)",
    apartmentPrice: 200,
    villaPrice: 275
  },
  {
    id: "virtual-staging",
    category: "Digital",
    name: "Virtual Staging",
    description: "Digital furniture placement (5 rooms)",
    apartmentPrice: 150,
    villaPrice: 200
  },
  {
    id: "floor-plan",
    category: "Digital",
    name: "Floor Plan Creation",
    description: "Professional 2D floor plans",
    apartmentPrice: 100,
    villaPrice: 150
  },
  {
    id: "360-tour",
    category: "Digital",
    name: "360° Virtual Tour",
    description: "360 camera tour with hosting (first month included, then €25/30 days)",
    apartmentPrice: 200,
    villaPrice: 250
  }
];

export const PricingCalculator = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("apartment");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [dronePhotoQuantity, setDronePhotoQuantity] = useState<number>(5);

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const adjustDronePhotoQuantity = (change: number) => {
    const newQuantity = Math.max(5, dronePhotoQuantity + change);
    setDronePhotoQuantity(newQuantity);
  };

  const getDronePhotoPrice = () => {
    const basePrice = selectedPropertyType === "villa" ? 65 : 50;
    return (dronePhotoQuantity / 5) * basePrice;
  };

  const calculateTotal = () => {
    const isVilla = selectedPropertyType === "villa";
    let total = Array.from(selectedServices).reduce((acc, serviceId) => {
      if (serviceId === "drone-photos") {
        return acc + getDronePhotoPrice();
      }
      const service = serviceOptions.find(s => s.id === serviceId);
      if (!service) return acc;
      return acc + (isVilla ? service.villaPrice : service.apartmentPrice);
    }, 0);
    return total;
  };

  const getServicePrice = (service: ServiceOption) => {
    return selectedPropertyType === "villa" ? service.villaPrice : service.apartmentPrice;
  };

  const groupedServices = serviceOptions.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceOption[]>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-accent-gold" />
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Custom Package Builder
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Select your property type and choose services to build your custom package with live pricing
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Property Type Selector */}
        <div className="lg:col-span-2">
          <Card className="glass-card p-6 mb-6">
            <h3 className="text-xl font-medium text-white mb-4">Property Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {propertyTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedPropertyType === type.id ? "primary" : "outline"}
                  className={`p-4 h-auto ${
                    selectedPropertyType === type.id
                      ? "bg-accent-gold text-primary border-accent-gold"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedPropertyType(type.id)}
                >
                  <div className="text-center">
                    <div className="font-medium">{type.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Services */}
          <div className="space-y-6">
            {Object.entries(groupedServices).map(([category, services]) => (
              <Card key={category} className="glass-card p-6">
                <h3 className="text-xl font-medium text-white mb-4">{category}</h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer border-white/10 bg-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/5"
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                selectedServices.has(service.id)
                                  ? "border-accent-gold bg-accent-gold"
                                  : "border-white/40"
                              }`}
                            >
                              {selectedServices.has(service.id) && (
                                <Check className="w-3 h-3 text-primary" />
                              )}
                            </div>
                             <div>
                               <h4 className="font-medium text-white">{service.name}</h4>
                               <p className="text-sm text-white/60 mt-1">{service.description}</p>
                               {service.subOptions && (
                                 <div className="mt-3 space-y-2">
                                   {service.subOptions.map((subOption) => (
                                     <div key={subOption.id} className="flex items-center gap-2 text-xs">
                                       <div className="w-1.5 h-1.5 bg-accent-gold rounded-full flex-shrink-0"></div>
                                       <span className="text-accent-gold font-medium">{subOption.name}:</span>
                                       <span className="text-white/50">{subOption.description}</span>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>
                          </div>
                        </div>
                        <Badge className="bg-accent-gold text-primary ml-4">
                          €{getServicePrice(service)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {/* Special Drone Photography Section */}
                  {category === "Drone" && (
                    <div className="p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer border-white/10 bg-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/5"
                         onClick={() => toggleService("drone-photos")}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                selectedServices.has("drone-photos")
                                  ? "border-accent-gold bg-accent-gold"
                                  : "border-white/40"
                              }`}
                            >
                              {selectedServices.has("drone-photos") && (
                                <Check className="w-3 h-3 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-white">Drone Photography</h4>
                              <p className="text-sm text-white/60 mt-1">Aerial exterior shots</p>
                              
                              {/* Quantity Controls */}
                              <div className="mt-3 flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-8 h-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      adjustDronePhotoQuantity(-5);
                                    }}
                                    disabled={dronePhotoQuantity <= 5}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="text-white font-medium min-w-[60px] text-center">
                                    {dronePhotoQuantity} photos
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-8 h-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      adjustDronePhotoQuantity(5);
                                    }}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-accent-gold text-primary ml-4">
                          €{getDronePhotoPrice()}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <Card className="glass-card p-6 sticky top-24">
            <h3 className="text-xl font-medium text-white mb-4">Your Package</h3>
            
            {selectedServices.size === 0 ? (
              <p className="text-white/60 text-center py-8">
                Select services to see your custom package price
              </p>
            ) : (
              <div className="space-y-4">
                {Array.from(selectedServices).map((serviceId) => {
                  if (serviceId === "drone-photos") {
                    return (
                      <div key={serviceId} className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <div className="text-white text-sm font-medium">
                            Drone Photography ({dronePhotoQuantity} photos)
                          </div>
                          <div className="text-white/60 text-xs">Drone</div>
                        </div>
                        <div className="text-accent-gold font-medium">
                          €{getDronePhotoPrice()}
                        </div>
                      </div>
                    );
                  }
                  
                  const service = serviceOptions.find(s => s.id === serviceId);
                  if (!service) return null;
                  
                  return (
                    <div key={serviceId} className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <div className="text-white text-sm font-medium">{service.name}</div>
                        <div className="text-white/60 text-xs">{service.category}</div>
                      </div>
                      <div className="text-accent-gold font-medium">
                        €{getServicePrice(service)}
                      </div>
                    </div>
                  );
                })}
                
                <Separator className="bg-white/20" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-accent-gold font-bold text-xl">
                    €{calculateTotal()}
                  </span>
                </div>
                
                <Button className="w-full glass-button mt-6">
                  Request Quote
                </Button>
                
                <div className="mt-6 p-6 glass-card rounded-2xl">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-accent-gold mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Need a Custom Quote?
                      </h4>
                      <p className="text-white/70 text-sm">
                        Every project is unique. Contact us to discuss your specific 
                        requirements and get a personalized quote that fits your budget.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-white/60 text-center mt-4">
                  Final pricing may vary based on property specifics and location
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};