import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { PrivacyPolicy, ShippingPolicy, TermsOfService } from "./PolicyModals";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'shipping' | 'terms' | null>(null);

  const goToContact = (inquiry: string) => {
    navigate(`/?inquiry=${inquiry}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
      const el = document.querySelector('#contact');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/?inquiry=${inquiry}`);
      window.dispatchEvent(new CustomEvent('inquiryChange', { detail: inquiry }));
    }, 100);
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newsletterFormRef = useRef<HTMLFormElement>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterFormRef.current) return;

    setIsSubmitting(true);
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      
      // 1. Send subscription notification to admin
      await emailjs.sendForm(
        "service_fid8gws", 
        "template_ajrlw8p", 
        newsletterFormRef.current,
        "AW2Bv1LbK8Wl0w--1"
      );
      
      // 2. Send auto-reply to subscriber
      await emailjs.sendForm(
        "service_fid8gws", 
        "template_xluhqwq", 
        newsletterFormRef.current,
        "AW2Bv1LbK8Wl0w--1"
      );
      
      const { toast } = await import('sonner');
      toast.success("Subscribed successfully!");
      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      const { toast } = await import('sonner');
      toast.error("Subscription failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };


  return (
    <footer className="bg-gradient-to-br from-tea-brown via-tea-earth to-tea-brown text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Taju Tea logo"
                className="h-12 w-auto drop-shadow-sm"
              />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-[0.05em] uppercase text-primary-foreground whitespace-nowrap">
                TAJU TEA
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              From Garden to Cup, Naturally. Premium orthodox teas from the heart of the Assam.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white" asChild>
                <a href="https://www.instagram.com/taju_tea/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Stay Connected</h3>
            <p className="text-sm text-white/80 mb-4">
              Get updates on new harvests, brewing tips, and exclusive offers.
            </p>
            <form id="newsletter-form" ref={newsletterFormRef} onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                name="from_email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-tea-gold"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                variant="secondary" 
                size="icon" 
                className="flex-shrink-0 bg-tea-gold hover:bg-tea-gold-light text-tea-brown disabled:opacity-50"
              >
                <Mail className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
              </Button>
            </form>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Shop</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><button onClick={() => goToProduct('himalayan-green-tea')} className="hover:text-white transition-colors text-left">Green Tea</button></li>
              <li><button onClick={() => goToProduct('heritage-black-tea')} className="hover:text-white transition-colors text-left">Black Tea</button></li>
              <li><button onClick={() => goToContact('sample')} className="hover:text-white transition-colors text-left">Sample Packs</button></li>
              <li><button onClick={() => goToContact('bulk')} className="hover:text-white transition-colors text-left">Bulk Orders</button></li>
              <li><button onClick={() => goToContact('gift')} className="hover:text-white transition-colors text-left">Gift Sets</button></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; {currentYear} Taju Tea. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button 
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-tea-gold transition-colors text-xs sm:text-sm font-medium text-white"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActivePolicy('terms')}
              className="hover:text-tea-gold transition-colors text-xs sm:text-sm font-medium text-white"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setActivePolicy('shipping')}
              className="hover:text-tea-gold transition-colors text-xs sm:text-sm font-medium text-white"
            >
              Shipping Policy
            </button>
          </div>

          <PrivacyPolicy isOpen={activePolicy === 'privacy'} onOpenChange={(open) => !open && setActivePolicy(null)} />
          <TermsOfService isOpen={activePolicy === 'terms'} onOpenChange={(open) => !open && setActivePolicy(null)} />
          <ShippingPolicy isOpen={activePolicy === 'shipping'} onOpenChange={(open) => !open && setActivePolicy(null)} />

        </div>
      </div>
    </footer>
  );
};
