import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { initTracking } from "@/utils/tracking";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("taju-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("taju-cookie-consent", "accepted");
    // Trigger tracking scripts
    initTracking();
    window.dispatchEvent(new Event("cookie-consent-accepted"));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("taju-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 md:max-w-[340px] z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-card/95 backdrop-blur-md border border-tea-gold/20 shadow-2xl rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-4 h-4 text-tea-green" />
          </div>
          
          <div className="flex-grow">
            <p className="text-xs text-muted-foreground leading-tight">
              We use cookies to improve your experience.
            </p>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button 
            onClick={handleAccept}
            size="sm"
            className="flex-1 h-8 text-[11px] bg-gradient-green text-primary-foreground hover:opacity-90 shadow-md"
          >
            Accept
          </Button>
          <Button 
            onClick={handleDecline}
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-[11px] border-tea-gold/20 hover:bg-tea-gold/10"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};
