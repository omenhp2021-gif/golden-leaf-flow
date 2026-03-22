import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

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

  const goToProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };


  return (
    <footer className="bg-gradient-to-br from-tea-brown via-tea-earth to-tea-brown text-primary-foreground">
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
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              From Garden to Cup, Naturally. Premium orthodox teas from the heart of the Assam.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10" asChild>
                <a href="https://www.instagram.com/taju_tea/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Get updates on new harvests, brewing tips, and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="icon" className="flex-shrink-0 bg-tea-gold hover:bg-tea-gold-light">
                <Mail className="w-4 h-4 text-tea-brown" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><button onClick={() => goToProduct('himalayan-green-tea')} className="hover:text-primary-foreground transition-colors text-left">Green Tea</button></li>
              <li><button onClick={() => goToProduct('heritage-black-tea')} className="hover:text-primary-foreground transition-colors text-left">Black Tea</button></li>
              <li><button onClick={() => goToContact('sample')} className="hover:text-primary-foreground transition-colors text-left">Sample Packs</button></li>
              <li><button onClick={() => goToContact('bulk')} className="hover:text-primary-foreground transition-colors text-left">Bulk Orders</button></li>
              <li><button onClick={() => goToContact('gift')} className="hover:text-primary-foreground transition-colors text-left">Gift Sets</button></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {currentYear} Taju Tea. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-tea-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-tea-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-tea-gold transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
