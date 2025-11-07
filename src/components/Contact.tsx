import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Package } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Start a{" "}
                <span className="text-secondary">Conversation</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a tea lover looking to explore our collection or a business seeking wholesale partnerships, we'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6 pt-6">
              <Card className="p-6 border-0 bg-muted/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">hello@orthodoxteaco.com</p>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-muted/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-muted/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Visit Our Estate</h3>
                  <p className="text-muted-foreground">Tea Garden Road, Darjeeling District, West Bengal, India</p>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-secondary/10 border-secondary/30 border-2 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Wholesale Inquiries</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Minimum order quantities start at 5kg. Custom packaging and private labeling available.
                  </p>
                  <Button variant="outline" size="sm" className="border-secondary/50 hover:bg-secondary/10">
                    Download Rate Card
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-0 shadow-xl bg-card">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="border-2 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="border-2 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business Name (Optional)</Label>
                <Input 
                  id="business" 
                  placeholder="Your Company" 
                  className="border-2 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry">Inquiry Type</Label>
                <select 
                  id="inquiry"
                  className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Wholesale Partnership</option>
                  <option>Product Questions</option>
                  <option>Sample Request</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your interest in our teas..."
                  rows={5}
                  className="border-2 focus:border-secondary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 shadow-lg"
              >
                Send Message
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
