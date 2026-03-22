import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Package } from "lucide-react";
import { useState, useEffect } from "react";

export const Contact = () => {
  const inquiryOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "wholesale", label: "Wholesale Partnership" },
    { value: "product", label: "Product Questions" },
    { value: "sample", label: "Sample Pack" },
    { value: "bulk", label: "Bulk Order" },
    { value: "gift", label: "Gift Set" },
  ];

  const [selectedInquiry, setSelectedInquiry] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check: If this hidden field is filled, it's a bot
    if (honeypot) {
      console.warn("Spam detected via honeypot.");
      return;
    }

    if (cooldown > 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set 60 second cooldown after successful submission attempt
    setCooldown(60);
    setIsSubmitting(false);
    
    // For demo/static purposes:
    alert("Thank you! Your message has been sent. Please wait 60 seconds before sending another.");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inquiry = params.get("inquiry");
    if (inquiry && inquiryOptions.some(o => o.value === inquiry)) {
      setSelectedInquiry(inquiry);
    }
  }, []);

  useEffect(() => {
    const handleInquiryChange = (e: Event) => {
      const inquiry = (e as CustomEvent).detail;
      if (inquiry && inquiryOptions.some(o => o.value === inquiry)) {
        setSelectedInquiry(inquiry);
      }
    };
    window.addEventListener('inquiryChange', handleInquiryChange);
    return () => window.removeEventListener('inquiryChange', handleInquiryChange);
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-block mb-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  Connect with <span className="bg-gradient-green bg-clip-text text-transparent">Taju</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-gold rounded-full gold-shimmer" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a tea enthusiast discovering your next favorite brew, or a café owner seeking exceptional wholesale partnerships, we welcome you to the Taju Tea family.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6 pt-6">
              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30">
                  <Mail className="w-6 h-6 text-tea-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">hello@tajutea.com</p>
                </div>
              </Card>

              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30">
                  <Phone className="w-6 h-6 text-tea-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </Card>

              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30">
                  <MapPin className="w-6 h-6 text-tea-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Visit Taju Estate</h3>
                  <p className="text-muted-foreground">Taju Road, Himalayan Foothills, Darjeeling 734101, India</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-gold border-2 border-tea-gold shadow-lg flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 rounded-full bg-tea-brown/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-tea-brown" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-tea-brown">Wholesale Partnerships</h3>
                  <p className="text-sm text-tea-brown/80 mb-3 leading-relaxed">
                    Minimum orders from 5kg. Premium packaging, custom blends, and private labeling available for your brand.
                  </p>
                  <Button variant="outline" size="sm" className="bg-tea-brown text-tea-cream hover:bg-tea-brown/90 border-0 shadow-md">
                    Download Rate Card
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-2 border-tea-gold/20 shadow-2xl bg-gradient-to-br from-card via-tea-gold/5 to-card">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* HONEYPOT FIELD - Hidden from humans */}
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  name="website_url" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Tushar B"
                  className="border-2 focus:border-tea-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Tajutea@example.com"
                  className="border-2 focus:border-tea-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business" className="font-semibold">Business Name (Optional)</Label>
                <Input
                  id="business"
                  placeholder="Your Company"
                  className="border-2 focus:border-tea-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry" className="font-semibold">Inquiry Type</Label>
                <select
                  id="inquiry"
                  value={selectedInquiry}
                  onChange={(e) => setSelectedInquiry(e.target.value)}
                  className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-tea-gold focus:outline-none transition-colors"
                >
                  {inquiryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-semibold">Message</Label>
                <Textarea
                  id="message"
                  required
                  placeholder="Tell us about your interest in Taju teas..."
                  rows={5}
                  className="border-2 focus:border-tea-gold resize-none transition-colors"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || cooldown > 0}
                className="w-full bg-gradient-green hover:opacity-90 shadow-xl hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cooldown > 0 ? `Wait ${cooldown}s` : isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours. For urgent matters, please call us directly.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
