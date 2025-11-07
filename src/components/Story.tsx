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
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-secondary">3rd</div>
              <div className="text-sm text-muted-foreground">Generation</div>
              <div className="text-sm text-muted-foreground">Tea Makers</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Where Heritage Meets{" "}
                <span className="text-secondary">Purity</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our story begins in the mist-covered hills of India's finest tea estates, where generations of tea makers have perfected the art of orthodox processing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every leaf is plucked at dawn, hand-rolled with precision, and carefully oxidized to preserve the natural character that makes orthodox tea incomparable. We believe tea should tell a story of place, people, and patience.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="p-6 border-0 bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <value.icon className="w-8 h-8 text-secondary mb-3" />
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
