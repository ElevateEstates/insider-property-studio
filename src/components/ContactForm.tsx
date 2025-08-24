import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [selectedType, setSelectedType] = useState("");
  const [otherSpecification, setOtherSpecification] = useState("");
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks! You're on the insider list.",
      description: "We'll send you exclusive property previews soon.",
    });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    if (value === "other") {
      setIsOtherDialogOpen(true);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="secondary" className="mb-4 px-4 py-2 glass-effect text-white border-white/30">
              Get Started
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Work <span className="text-gradient-gold">Together?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Tell us about your project and we'll create a tailored strategy for your success
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8 animate-slide-in">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p>contact@costaestateservices.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>+34 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p>Costa del Sol, Spain</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-white mb-3">Why Choose Us?</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Access to exclusive off-market properties</li>
                  <li>• Professional marketing content creation</li>
                  <li>• Trusted local agent network</li>
                  <li>• Proven track record of success</li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white mb-2 block">First Name</Label>
                    <Input id="firstName" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white mb-2 block">Last Name</Label>
                    <Input id="lastName" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                  <Input id="email" type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">Phone</Label>
                  <Input id="phone" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                
                <div>
                  <Label htmlFor="clientType" className="text-white mb-2 block">I am a...</Label>
                  <Select onValueChange={handleTypeChange}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home-seller">Home Seller</SelectItem>
                      <SelectItem value="home-buyer">Home Buyer</SelectItem>
                      <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                      <SelectItem value="small-business">Small Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button type="submit" className="btn-hero w-full group">
                  Send Message
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Other Specification Dialog */}
      <Dialog open={isOtherDialogOpen} onOpenChange={setIsOtherDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Please Specify</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="otherSpec">How would you describe yourself?</Label>
            <Textarea
              id="otherSpec"
              value={otherSpecification}
              onChange={(e) => setOtherSpecification(e.target.value)}
              placeholder="Please specify your role or business type..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setIsOtherDialogOpen(false);
                  setSelectedType(`other: ${otherSpecification}`);
                }}
                className="flex-1"
              >
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsOtherDialogOpen(false);
                  setSelectedType("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
