import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import greenTeaImage from "@/assets/green-tea-closeup.jpg";
import blackTeaImage from "@/assets/black-tea-closeup.jpg";
import { ShoppingCart, Thermometer, Clock, MapPin } from "lucide-react";
import { ProductCardWithLeaves } from "./ProductCardWithLeaves";

const products = [
  {
    id: 1,
    name: "Organic Orthodox Green Tea",
    image: greenTeaImage,
    description: "Delicate, vegetal notes with a sweet, lingering finish. Hand-rolled from first flush leaves.",
    tastingNotes: ["Grassy", "Sweet", "Floral"],
    steepTemp: "75-80°C",
    steepTime: "2-3 min",
    origin: "Darjeeling, 2000m elevation",
    price: "$24.99",
    priceUnit: "100g",
  },
  {
    id: 2,
    name: "Organic Orthodox Black Tea",
    image: blackTeaImage,
    description: "Rich, malty character with hints of cocoa and dried fruit. Full-bodied with a smooth finish.",
    tastingNotes: ["Malty", "Cocoa", "Dried Fruit"],
    steepTemp: "95-100°C",
    steepTime: "3-5 min",
    origin: "Assam, 500m elevation",
    price: "$22.99",
    priceUnit: "100g",
  },
];

export const Products = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Tea Collection</h2>
          <p className="text-xl text-muted-foreground">
            Discover the pure essence of single-estate orthodox teas, cultivated with care and processed by hand.
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
                  <Badge className="bg-accent text-accent-foreground shadow-md">
                    Organic Certified
                  </Badge>
                </div>
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
                    <div className="text-3xl font-bold text-primary">{product.price}</div>
                    <div className="text-sm text-muted-foreground">{product.priceUnit}</div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 shadow-md group">
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
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 hover:bg-secondary/10"
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
