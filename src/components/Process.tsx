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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            The Orthodox Method
          </h2>
          <p className="text-xl text-muted-foreground">
            Five time-honored steps that transform fresh leaves into exceptional tea, preserving natural character and complexity.
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
                className="relative p-6 border-2 bg-card hover:bg-card/80 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary text-primary font-bold flex items-center justify-center text-sm shadow-md">
                  {index + 1}
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4 pt-2">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-secondary" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
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
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-2">
            <span className="font-semibold text-foreground">The difference is in the details.</span> Unlike CTC (Cut-Tear-Curl) tea, orthodox processing preserves the whole leaf structure, resulting in a more nuanced, aromatic cup with greater depth and clarity.
          </p>
        </div>
      </div>
    </section>
  );
};
