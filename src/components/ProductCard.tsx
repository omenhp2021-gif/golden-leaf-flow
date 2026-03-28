import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { ExternalLink, Thermometer, Clock, MapPin } from "lucide-react";
import { trackInterest } from "@/utils/tracking";
import { useShopify } from "@/contexts/ShopifyContext";

const SHOPIFY_URL = "https://kaziranga-tea-factory-2.myshopify.com";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const navigate = useNavigate();
  const { prices } = useShopify();
  // Default selected weight to the first pricing option if available
  const [selectedWeight, setSelectedWeight] = useState(
    product.pricingOptions?.[0]?.weight || product.priceUnit
  );
  
  const [showNotification, setShowNotification] = useState(false);

  // Update selected weight if product changes
  useEffect(() => {
    if (product.pricingOptions?.length) {
      setSelectedWeight(product.pricingOptions[0].weight);
    } else {
      setSelectedWeight(product.priceUnit);
    }
  }, [product]);

  const handleNotifyMe = () => {
    // Track interest in analytics (Option 2)
    trackInterest(product.name);
    
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

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
    <Card className={`overflow-hidden hover-lift border-0 shadow-lg bg-card group flex flex-col h-full ${className || ""}`}>
      {/* Product Image */}
      <div 
        className="relative h-64 flex-shrink-0 overflow-hidden cursor-pointer"
        onClick={() => product.status !== "coming_soon" ? navigate(`/product/${product.slug}`) : undefined}
      >
        <img 
          src={product.image} 
          alt={`${product.name} - premium organic tea`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${product.status === "coming_soon" ? "blur-[2px] opacity-90 group-hover:blur-md" : ""}`}
        />
        
        {product.status === "coming_soon" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm z-20">
            <span className="text-white font-bold text-lg tracking-wider uppercase border border-white/50 px-4 py-2 rounded">Coming Soon</span>
          </div>
        )}

        {product.status !== "coming_soon" && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-gold text-accent-foreground shadow-lg border border-tea-gold-light/50 font-semibold text-xs">
              ✓ Naturally Grown
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent z-10" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div 
          className="cursor-pointer mb-3"
          onClick={() => navigate(`/product/${product.slug}`)}
        >
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        </div>

        {/* Tasting Notes */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tastingNotes.slice(0, 3).map((note) => (
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
        <div className="grid grid-cols-2 gap-2 py-3 border-t border-border mt-auto">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">{product.steepTemp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium truncate">{product.origin.split(',')[0]}</span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          {product.status === "coming_soon" ? (
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <Badge variant="outline" className="font-semibold px-3 py-1 bg-muted/50 text-muted-foreground text-sm">Coming Soon</Badge>
                 <Button 
                   size="sm"
                   className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all relative overflow-hidden"
                   onClick={handleNotifyMe}
                 >
                   Notify Me
                 </Button>
               </div>
               
               {/* Notification space */}
               <div className="h-4 flex items-center justify-end">
                 {showNotification && (
                   <p className="text-xs font-medium text-tea-gold animate-in fade-in slide-in-from-right-2 duration-300">
                     Thank you for your interest! We will notify you soon.
                   </p>
                 )}
               </div>
             </div>
          ) : (
             <div className="space-y-3">
                {/* Quantity Selector - Pills */}
                {product.pricingOptions && (
                  <div className="flex gap-2 flex-wrap">
                    {product.pricingOptions.map(option => (
                      <Badge
                        key={option.weight}
                        variant={selectedWeight === option.weight ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${selectedWeight === option.weight ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/20'}`}
                        onClick={() => setSelectedWeight(option.weight)}
                      >
                        {option.weight}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-green bg-clip-text text-transparent transition-all duration-300">
                      ₹{typeof currentPrice === 'number' ? currentPrice.toFixed(2) : currentPrice}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">{selectedWeight}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      Details
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-gradient-green hover:opacity-90 shadow-lg group"
                      asChild
                    >
                      <a
                        href={product.shopifyVariants?.[selectedWeight] ?? SHOPIFY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                        Buy
                      </a>
                    </Button>
                  </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </Card>
  );
};
