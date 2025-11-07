import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Facebook, Instagram, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8" />
              <span className="text-xl font-bold">Orthodox Tea Co.</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Single-estate organic orthodox teas crafted with reverence for tradition and purity.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Green Tea</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Black Tea</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sample Packs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Gift Sets</a></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Orthodox Process</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Brewing Guide</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Certifications</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
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
              <Button variant="secondary" size="icon" className="flex-shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {currentYear} Orthodox Green & Black Tea Co. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
