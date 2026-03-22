import { Card } from "@/components/ui/card";
import { Sprout, Wind, Hand, Droplets, Flame } from "lucide-react";

const steps = [
  {
    icon: Sprout,
    title: "Plucking",
    description: "Hand-selected two leaves and a bud at dawn, when moisture and aroma are at their peak.",
  },
  {
    icon: Wind,
    title: "Withering",
    description: "Leaves are spread thin and air-dried for 12-18 hours, reducing moisture and concentrating flavor.",
  },
  {
    icon: Hand,
    title: "Rolling",
    description: "Traditional hand-rolling or gentle machine rolling breaks cell walls, releasing essential oils.",
  },
  {
    icon: Droplets,
    title: "Oxidation",
    description: "Controlled exposure to oxygen develops the tea's color, aroma, and flavor complexity.",
  },
  {
    icon: Flame,
    title: "Drying",
    description: "Final heat treatment halts oxidation and locks in the tea's distinctive character and freshness.",
  },
];

export const Process = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative Line */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100,400 L300,350 L500,400 L700,350 L900,400 L1100,350"
          stroke="hsl(var(--tea-green))"
          strokeWidth="2"
          strokeDasharray="10 5"
          fill="none"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 fade-in-up">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              The <span className="bg-gradient-green bg-clip-text text-transparent">Orthodox</span> Craft
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-gold rounded-full gold-shimmer" />
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Five sacred steps, unchanged for centuries. This is how we honor each precious leaf, transforming nature's gift into liquid poetry.
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={step.title}
                className="relative p-6 border-2 border-tea-gold/20 bg-gradient-to-br from-card to-muted/10 hover:shadow-2xl hover:-translate-y-3 hover:border-tea-gold/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-green text-primary-foreground font-bold flex items-center justify-center shadow-lg border-2 border-card">
                  {index + 1}
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tea-green/20 to-tea-gold/20 flex items-center justify-center ring-2 ring-tea-gold/30">
                    <step.icon className="w-8 h-8 text-tea-green" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-muted/50 via-tea-gold/5 to-muted/50 rounded-3xl max-w-3xl mx-auto border border-tea-gold/20 shadow-xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground text-xl block mb-2">The Taju Difference</span>
            Unlike CTC (Cut-Tear-Curl) mass production, orthodox processing honors the whole leaf. The result? A tea that breathes with complexity, depth, and the unmistakable essence of its terroir—sip by sip revealing layers of flavor that can never be rushed.
          </p>
        </div>
      </div>
    </section>
  );
};
