import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
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
    emailjs.init("AW2Bv1LbK8Wl0w--1");
  }, []);

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

    if (!formRef.current) return;

    setIsSubmitting(true);
    
    try {
      // 1. Send to business
      const result1 = await emailjs.sendForm(
        "service_fid8gws", 
        "template_ajrlw8p", 
        formRef.current,
        "AW2Bv1LbK8Wl0w--1"
      );
      console.log("Business notification sent:", result1);
      
      // 2. Send auto-reply to customer
      const result2 = await emailjs.sendForm(
        "service_fid8gws", 
        "template_xluhqwq", 
        formRef.current,
        "AW2Bv1LbK8Wl0w--1"
      );
      console.log("Auto-reply sent:", result2);
      
      toast.success("Message sent successfully! Check your email.");
      setCooldown(60);
      formRef.current.reset();
      setSelectedInquiry("general");
    } catch (error: any) {
      console.error("EmailJS Full Error:", error);
      const msg = typeof error === 'string' ? error : (error?.text || error?.message || "Check your EmailJS dashboard settings.");
      toast.error(`Failed to send: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Contact Methods */}            <div className="space-y-6 pt-6">
              {/* Email Card */}
              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 h-full relative group hover-lift shadow-sm hover:shadow-md transition-all duration-300">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Contact@tajutea.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label="Email Taju Tea"
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30 relative z-10 transition-transform group-hover:scale-110 pointer-events-none">
                  <Mail className="w-6 h-6 text-tea-green" />
                </div>
                <div className="relative z-10 pointer-events-none">
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground break-all z-30 pointer-events-auto select-text cursor-text relative">Contact@tajutea.com</p>
                </div>
              </Card>

              {/* Phone Card */}
              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 h-full relative group hover-lift shadow-sm hover:shadow-md transition-all duration-300">
                <a 
                  href="tel:96786288877" 
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label="Call Taju Tea"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30 relative z-10 transition-transform group-hover:scale-110 pointer-events-none">
                  <Phone className="w-6 h-6 text-tea-green" />
                </div>
                <div className="relative z-10 pointer-events-none">
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground z-30 pointer-events-auto select-text cursor-text relative">96786288877</p>
                </div>
              </Card>

              {/* Address Card */}
              <Card className="p-6 border border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 flex items-start gap-4 h-full relative group hover-lift shadow-sm hover:shadow-md transition-all duration-300">
                <a 
                  href="https://www.google.com/maps/search/Balijuri,+Kaziranga,+Nagaon,+Assam+78141" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label="Visit Taju Tea Estate"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0 ring-2 ring-tea-gold/30 relative z-10 transition-transform group-hover:scale-110 pointer-events-none">
                  <MapPin className="w-6 h-6 text-tea-green" />
                </div>
                <div className="relative z-10 pointer-events-none">
                  <h3 className="font-semibold mb-1">Visit Taju Estate</h3>
                  <p className="text-muted-foreground z-30 pointer-events-auto select-text cursor-text relative">Balijuri, Kaziranga, Nagaon, Assam 78141</p>
                </div>
              </Card>

              {/* Wholesale Partnerships */}
              <Card className="p-6 border-2 border-tea-gold/20 bg-gradient-to-br from-tea-brown via-tea-earth to-tea-brown flex items-start gap-4 shadow-xl group hover-lift transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-tea-gold flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/10 transition-transform group-hover:scale-110">
                  <Briefcase className="w-6 h-6 text-tea-brown" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-tea-gold">Wholesale Partnerships</h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    Minimum orders from 5kg. Premium packaging, custom blends, and private labeling available for your brand.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-2 border-tea-gold/20 shadow-2xl bg-gradient-to-br from-card via-tea-gold/5 to-card">
            <form id="contact-form" ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
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
                  name="from_name"
                  required
                  placeholder="Tushar B"
                  className="border-2 focus:border-tea-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  name="from_email"
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
                  name="business_name"
                  placeholder="Your Company"
                  className="border-2 focus:border-tea-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry_type" className="font-semibold">Inquiry Type</Label>
                <select
                  id="inquiry_type"
                  name="inquiry_type"
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
                  name="message"
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
