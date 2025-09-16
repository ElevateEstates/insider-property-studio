import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Calculator } from "lucide-react";

interface ServiceOption {
  id: string;
  category: string;
  name: string;
  description: string;
  apartmentPrice: number;
  villaPrice: number;
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
    villaPrice: 325
  },
  {
    id: "photo-35",
    category: "Photography", 
    name: "Up to 35 Professional Photos",
    description: "Extended photo package with more angles",
    apartmentPrice: 325,
    villaPrice: 375
  },
  {
    id: "photo-50",
    category: "Photography",
    name: "Up to 50 Professional Photos",
    description: "Complete photo coverage of the property",
    apartmentPrice: 425,
    villaPrice: 500
  },
  {
    id: "video-basic",
    category: "Video",
    name: "Basic Video Tour",
    description: "3-5 minute walkthrough video",
    apartmentPrice: 150,
    villaPrice: 200
  },
  {
    id: "video-cinematic",
    category: "Video",
    name: "Cinematic Video Package",
    description: "Professional editing with drone footage",
    apartmentPrice: 350,
    villaPrice: 450
  },
  {
    id: "drone-photos",
    category: "Drone",
    name: "Drone Photography",
    description: "Aerial exterior shots",
    apartmentPrice: 125,
    villaPrice: 175
  },
  {
    id: "drone-video",
    category: "Drone",
    name: "Drone Video",
    description: "Aerial cinematic footage",
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
  }
];

export const PricingCalculator = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("apartment");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const calculateTotal = () => {
    const isVilla = selectedPropertyType === "villa";
    return Array.from(selectedServices).reduce((total, serviceId) => {
      const service = serviceOptions.find(s => s.id === serviceId);
      if (!service) return total;
      return total + (isVilla ? service.villaPrice : service.apartmentPrice);
    }, 0);
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
                    {type.id === "villa" && (
                      <div className="text-xs mt-1 opacity-80">+18% pricing</div>
                    )}
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
                      className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        selectedServices.has(service.id)
                          ? "border-accent-gold bg-accent-gold/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
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
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-accent-gold text-primary ml-4">
                          €{getServicePrice(service)}
                        </Badge>
                      </div>
                    </div>
                  ))}
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