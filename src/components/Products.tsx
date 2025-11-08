import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import greenTeaImage from "@/assets/green-tea-closeup.jpg";
import blackTeaImage from "@/assets/black-tea-closeup.jpg";
import { ShoppingCart, Thermometer, Clock, MapPin, Leaf } from "lucide-react";
import { ProductCardWithLeaves } from "./ProductCardWithLeaves";

const products = [
  {
    id: 1,
    name: "Kanchan Himalayan Green Tea",
    image: greenTeaImage,
    description: "Ethereal jade liquor with delicate vegetal sweetness. First flush leaves hand-rolled at dawn from our high-altitude estate, delivering floral complexity and a lingering umami finish.",
    tastingNotes: ["Jade Green", "Spring Floral", "Sweet Umami"],
    steepTemp: "75-80°C",
    steepTime: "2-3 min",
    origin: "Kanchan Estate, 2000m",
    price: "$32.99",
    priceUnit: "100g",
  },
  {
    id: 2,
    name: "Kanchan Heritage Black Tea",
    image: blackTeaImage,
    description: "Deep amber nectar with robust malty character. Orthodox-processed from mature leaves, revealing notes of dark chocolate, dried stone fruit, and warm spice. A testament to traditional craftsmanship.",
    tastingNotes: ["Dark Chocolate", "Malty", "Stone Fruit"],
    steepTemp: "95-100°C",
    steepTime: "3-5 min",
    origin: "Kanchan Estate, Heritage Block",
    price: "$29.99",
    priceUnit: "100g",
  },
];

export const Products = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 fade-in-up">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              Our <span className="bg-gradient-green bg-clip-text text-transparent">Premium</span> Collection
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-gold rounded-full gold-shimmer" />
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Each leaf handpicked at dawn, each batch crafted with generations of expertise. 
            Discover orthodox teas that honor tradition while celebrating pure, natural flavor.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <ProductCardWithLeaves key={product.id} index={index}>
              <Card className="overflow-hidden hover-lift border-0 shadow-lg bg-card">

              {/* Product Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.name} - close-up of premium organic tea leaves`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-gold text-accent-foreground shadow-lg border border-tea-gold-light/50 font-semibold">
                    ✓ Organic Certified
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Tasting Notes */}
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note) => (
                    <Badge 
                      key={note} 
                      variant="secondary"
                      className="text-xs"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>

                {/* Brewing Guide */}
                <div className="grid grid-cols-3 gap-3 py-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <div className="text-xs">
                      <div className="font-medium">{product.steepTemp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="text-xs">
                      <div className="font-medium">{product.steepTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div className="text-xs">
                      <div className="font-medium text-xs leading-tight">{product.origin.split(',')[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="text-3xl font-bold bg-gradient-green bg-clip-text text-transparent">{product.price}</div>
                    <div className="text-sm text-muted-foreground font-medium">{product.priceUnit}</div>
                  </div>
                  <Button className="bg-gradient-green hover:opacity-90 shadow-lg hover-lift group">
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              </Card>
            </ProductCardWithLeaves>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-tea-gold hover:bg-tea-gold/10 hover:border-tea-gold shadow-lg hover-lift px-8"
          >
            <Leaf className="w-4 h-4 mr-2" />
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
