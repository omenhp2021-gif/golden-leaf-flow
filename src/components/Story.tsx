import { Card } from "@/components/ui/card";
import estateImage from "@/assets/tea-estate-landscape.jpg";
import { Leaf, Award, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Organic Heritage",
    description: "100% certified organic cultivation with zero pesticides, preserving soil health and biodiversity.",
  },
  {
    icon: Award,
    title: "Orthodox Processing",
    description: "Traditional hand-rolling and small-batch processing that honors centuries of tea craft.",
  },
  {
    icon: Heart,
    title: "Single Estate",
    description: "Every leaf traced to a single garden, ensuring quality, terroir, and complete transparency.",
  },
  {
    icon: Users,
    title: "Fair Partnerships",
    description: "Direct relationships with farmers and pickers, ensuring fair wages and sustainable livelihoods.",
  },
];

export const Story = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={estateImage} 
                alt="Sunrise over misty tea estate with rolling hills of tea bushes"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-card via-tea-gold/5 to-card p-8 rounded-2xl shadow-2xl border border-tea-gold/20">
              <div className="text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent">3rd</div>
              <div className="text-sm font-semibold text-tea-green">Generation</div>
              <div className="text-xs text-muted-foreground mt-1">Tea Masters</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="inline-block mb-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  The <span className="bg-gradient-green bg-clip-text text-transparent">Kanchan</span> Legacy
                </h2>
                <div className="h-1 w-24 bg-gradient-gold rounded-full gold-shimmer" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Nestled in the pristine Himalayan foothills, Kanchan Tea Garden has been cultivating excellence for three generations. Our single-estate approach ensures that every cup carries the unique terroir of our blessed land.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each leaf is plucked at the perfect moment of dawn, when dew still glistens and flavor compounds are at their peak. Hand-rolled by skilled artisans using orthodox methods passed down through generations, our teas preserve the soul of the garden.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="p-6 border border-tea-gold/10 bg-gradient-to-br from-card to-muted/20 hover:shadow-xl hover:border-tea-gold/30 transition-all duration-500 hover-lift"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <value.icon className="w-8 h-8 text-tea-green mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
