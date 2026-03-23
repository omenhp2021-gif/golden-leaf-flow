import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PolicyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
}

const PolicyModal = ({ isOpen, onOpenChange, title, content }: PolicyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden border-2 border-tea-gold/20 shadow-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-tea-gold/10">
          <DialogTitle className="text-2xl font-bold bg-gradient-green bg-clip-text text-transparent">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Last updated: March 2026
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 p-6 text-sm text-foreground/80 leading-relaxed overflow-y-auto max-h-[60vh] custom-scrollbar">
          {content}
        </div>
        <div className="p-4 border-t border-tea-gold/10 flex justify-end gap-3 bg-muted/30">
          <DialogClose asChild>
            <Button variant="outline" className="border-tea-gold/50 hover:bg-tea-gold/10 text-tea-brown font-semibold">
              Go Back
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PrivacyPolicy = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) => (
  <PolicyModal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    title="Privacy Policy"
    content={
      <div className="space-y-4">
        <section>
          <h4 className="font-bold text-foreground mb-2">1. Information We Collect</h4>
          <p>We collect information you provide directly to us through our contact forms, wholesale inquiries, and newsletter sign-ups. This may include your name, email address, phone number, and business details.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">2. How We Use Your Information</h4>
          <p>Your information is used solely to respond to your inquiries, process your orders, and provide you with updates if you've subscribed to our newsletter. We do not sell or share your personal data with third parties for marketing purposes.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">3. Cookies and Tracking</h4>
          <p>We use essential cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through the consent banner on our website.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">4. Data Security</h4>
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>
        </section>
        <p className="mt-6 text-xs italic">For any privacy-related questions, please contact us at Contact@tajutea.com</p>
      </div>
    }
  />
);

export const ShippingPolicy = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) => (
  <PolicyModal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    title="Shipping Policy"
    content={
      <div className="space-y-4">
        <section>
          <h4 className="font-bold text-foreground mb-2">1. Order Processing</h4>
          <p>All orders are processed within 1-2 business days. Orders are not shipped on weekends or public holidays.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">2. Shipping Rates & Estimates</h4>
          <p>We offer standard shipping across India. Estimated delivery time is 5-7 business days depending on your location. Shipping charges for your order will be calculated and displayed at checkout.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">3. Shipment Confirmation & Tracking</h4>
          <p>You will receive a shipment confirmation email containing your tracking number(s) once your order has shipped.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">4. International Shipping</h4>
          <p>We currently only ship within India. For international wholesale inquiries, please contact us directly.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">5. Damages</h4>
          <p>Taju Tea is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
        </section>
      </div>
    }
  />
);

export const TermsOfService = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) => (
  <PolicyModal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    title="Terms of Service"
    content={
      <div className="space-y-4">
        <section>
          <h4 className="font-bold text-foreground mb-2">1. Acceptance of Terms</h4>
          <p>By accessing and using the Taju Tea website, you accept and agree to be bound by these Terms of Service.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">2. Intellectual Property</h4>
          <p>All content on this website, including text, graphics, logos, and images, is the property of Taju Tea and protected by applicable copyright and trademark laws.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">3. Use of Site</h4>
          <p>You may use this site for lawful purposes only. Any unauthorized use of the site or its content may give rise to a claim for damages and/or be a criminal offense.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">4. Limitation of Liability</h4>
          <p>Taju Tea shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or products.</p>
        </section>
        <section>
          <h4 className="font-bold text-foreground mb-2">5. Governing Law</h4>
          <p>These terms are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in the State of Assam.</p>
        </section>
      </div>
    }
  />
);
