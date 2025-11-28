import { Button } from "@/components/ui/button";
import { Leaf, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-tea-green group-hover:rotate-12 transition-transform duration-500" />
              <Leaf className="w-4 h-4 text-tea-gold absolute -right-1 -bottom-1 opacity-80" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight">Kanchan</span>
              <span className="text-xs text-muted-foreground tracking-wider">TEA GARDEN</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Cart & Menu */}
          <div className="flex items-center gap-4">
            <Cart />
            
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex gap-2"
                onClick={() => navigate("/auth")}
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}
            
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
              
              {user ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="justify-start gap-2"
                  onClick={() => {
                    navigate("/auth");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
