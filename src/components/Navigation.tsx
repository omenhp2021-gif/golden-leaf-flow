import { Button } from "@/components/ui/button";
import { Menu, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import logo from "@/assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const doScroll = () => {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      // Wait for React to render the home page, then scroll
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group mr-4 sm:mr-6 md:mr-8 flex-shrink-0">
            <img
              src={logo}
              alt="Taju Tea logo"
              className="h-12 w-auto drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
            <span className="text-base font-bold tracking-[0.2em] uppercase text-foreground/90 whitespace-nowrap">
              TAJU TEA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-4 lg:ml-6">
            <button onClick={() => scrollToSection("#products")} className="text-sm font-medium hover:text-secondary transition-colors">
              Shop
            </button>
            <button onClick={() => scrollToSection("#story")} className="text-sm font-medium hover:text-secondary transition-colors">
              Our Story
            </button>
            <button onClick={() => scrollToSection("#process")} className="text-sm font-medium hover:text-secondary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("#contact")} className="text-sm font-medium hover:text-secondary transition-colors">
              Wholesale
            </button>
            <button onClick={() => scrollToSection("#contact")} className="text-sm font-medium hover:text-secondary transition-colors">
              Contact
            </button>
          </div>

          {/* Contact Cards & Menu */}
          <div className="flex items-center gap-3 ml-4 sm:ml-6 md:ml-8 flex-shrink-0">
            {/* Contact Cards - Desktop */}
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Call Us</span>
            </a>

            <a
              href="mailto:info@tajutea.com"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors group"
            >
              <Mail className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Email Us</span>
            </a>

            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("#products")} className="text-left text-sm font-medium hover:text-secondary transition-colors">
                Shop
              </button>
              <button onClick={() => scrollToSection("#story")} className="text-left text-sm font-medium hover:text-secondary transition-colors">
                Our Story
              </button>
              <button onClick={() => scrollToSection("#process")} className="text-left text-sm font-medium hover:text-secondary transition-colors">
                Process
              </button>
              <button onClick={() => scrollToSection("#contact")} className="text-left text-sm font-medium hover:text-secondary transition-colors">
                Wholesale
              </button>
              <button onClick={() => scrollToSection("#contact")} className="text-left text-sm font-medium hover:text-secondary transition-colors">
                Contact
              </button>

              {/* Contact Cards - Mobile */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <a
                  href="tel:+919876543210"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Call Us</span>
                </a>

                <a
                  href="mailto:info@tajutea.com"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Email Us</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
