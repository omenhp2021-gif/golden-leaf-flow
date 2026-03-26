import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tea-leaves.jpg";
import { ArrowRight, Leaf, Award, Package } from "lucide-react";
import { TeaLeafAnimation } from "./TeaLeafAnimation";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Interactive Tea Leaf Animation */}
      <TeaLeafAnimation />

      {/* Animated Tea Line SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50,400 Q300,200 600,350 T1250,400"
          stroke="hsl(var(--tea-green))"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-draw-line"
          fill="none"
        />
        <path
          d="M-50,450 Q350,250 650,400 T1250,450"
          stroke="hsl(var(--tea-green))"
          strokeWidth="1.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-draw-line"
          fill="none"
          style={{ animationDelay: '0.3s' }}
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-tea-green/10 to-tea-gold/10 px-5 py-2.5 rounded-full border border-tea-gold/20 shadow-lg">
              <Leaf className="w-4 h-4 text-tea-green" />
              <span className="text-sm font-semibold bg-gradient-green bg-clip-text text-transparent">Premium Orthodox Tea Estate</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              From Garden to Cup,{" "}
              <span className="bg-gradient-green bg-clip-text text-transparent">Naturally.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl text-balance leading-relaxed">
              Experience the pure essence of hand-crafted orthodox teas from the pristine gardens of Taju-Tea. Every leaf tells a story of tradition, purity, and uncompromising quality.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Naturally Grown</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Single-Estate</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Small-Batch Processing</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-green text-primary-foreground hover:opacity-90 shadow-xl hover-lift group px-8"
                onClick={() => {
                  const element = document.querySelector('#products');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Explore Our Teas
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-tea-gold hover:bg-tea-gold/10 hover:border-tea-gold shadow-lg hover-lift"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Wholesale Inquiry
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Premium organic orthodox tea leaves on natural linen fabric"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-card via-tea-gold/5 to-card p-8 rounded-2xl shadow-2xl border border-tea-gold/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-6xl font-bold text-tea-gold">100%</div>
              <div className="text-base font-bold text-tea-green">Naturally</div>
              <div className="text-sm font-bold text-foreground mt-1">Grown</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
