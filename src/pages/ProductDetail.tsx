import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "@/data/products";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ExternalLink, 
  Thermometer, 
  Clock, 
  MapPin, 
  ArrowLeft,
  Leaf,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useShopify } from "@/contexts/ShopifyContext";

const SHOPIFY_URL = "https://kaziranga-tea-factory-2.myshopify.com";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { prices } = useShopify();
  
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedWeight, setSelectedWeight] = useState(
    product?.pricingOptions?.[0]?.weight || product?.priceUnit || "100g"
  );

  useEffect(() => {
    if (product) {
      if (product.pricingOptions?.length) {
        setSelectedWeight(product.pricingOptions[0].weight);
      } else {
        setSelectedWeight(product.priceUnit);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The tea you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  let currentPrice = product.pricingOptions?.find(
    (p) => p.weight === selectedWeight
  )?.price || product.price;

  const variantUrl = product.shopifyVariants?.[selectedWeight];
  if (variantUrl) {
    const variantIdRow = variantUrl.split('variant=')[1];
    const variantId = variantIdRow ? variantIdRow.split('&')[0] : null;
    if (variantId && prices[variantId]) {
      currentPrice = prices[variantId];
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </div>

        {/* Product Hero */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute top-6 right-6 bg-gradient-gold text-accent-foreground shadow-lg border border-tea-gold-light/50 font-semibold text-sm px-4 py-2">
                ✓ Organic Certified
              </Badge>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Tasting Notes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Tasting Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note) => (
                    <Badge 
                      key={note} 
                      variant="secondary"
                      className="text-sm px-4 py-1"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick Brew Info */}
              <Card className="p-6 bg-muted/50 border-0">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Quick Brew Guide
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Thermometer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{product.steepTemp}</div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{product.steepTime}</div>
                      <div className="text-xs text-muted-foreground">Steep Time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{product.origin.split(',')[0]}</div>
                      <div className="text-xs text-muted-foreground">Origin</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Size Selector */}
              {product.pricingOptions && (
                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    Select Size
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.pricingOptions.map(option => (
                      <Badge
                        key={option.weight}
                        variant={selectedWeight === option.weight ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-colors ${selectedWeight === option.weight ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/20'}`}
                        onClick={() => setSelectedWeight(option.weight)}
                      >
                        {option.weight}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 mt-2 border-t border-border">
                <div>
                  <div className="text-4xl font-bold bg-gradient-green bg-clip-text text-transparent">
                    ₹{typeof currentPrice === 'number' ? currentPrice.toFixed(2) : currentPrice}
                  </div>
                  <div className="text-muted-foreground font-medium">per {selectedWeight}</div>
                </div>
                <div className="flex gap-3 flex-1 sm:justify-end">
                  <Button 
                    size="lg"
                    className="bg-gradient-green hover:opacity-90 shadow-lg hover-lift group px-8"
                    asChild
                  >
                    <a href={product.shopifyVariants?.[selectedWeight] ?? SHOPIFY_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Buy Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brewing Instructions */}
        <section className="mt-24 bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Brewing Instructions</h2>
              <p className="text-muted-foreground">Master the art of brewing the perfect cup</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.brewingInstructions.slice(0, 4).map((instruction) => (
                <Card key={instruction.step} className="p-6 bg-card border-0 shadow-md hover-lift">
                  <div className="w-12 h-12 rounded-full bg-gradient-green flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                    {instruction.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{instruction.title}</h3>
                  <p className="text-sm text-muted-foreground">{instruction.description}</p>
                </Card>
              ))}
            </div>

            {product.brewingInstructions.length > 4 && (
              <Card className="p-6 bg-card border-0 shadow-md mt-6 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-green flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                  {product.brewingInstructions[4].step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.brewingInstructions[4].title}</h3>
                <p className="text-sm text-muted-foreground">{product.brewingInstructions[4].description}</p>
              </Card>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Health Benefits</h2>
                <div className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-tea-green mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-tea-green" />
                  <h3 className="font-semibold text-lg">Ingredients</h3>
                </div>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-muted-foreground">{ingredient}</li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Storage:</span> Keep in a cool, dry place away from direct sunlight. Best consumed within 12 months of opening.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
