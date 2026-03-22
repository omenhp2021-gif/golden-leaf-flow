import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardWithLeaves } from "./ProductCardWithLeaves";
import { ProductCard } from "./ProductCard";

const SHOPIFY_URL = "https://kaziranga-tea-factory-2.myshopify.com";

export const Products = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
      
      // Calculate active index based on scroll position
      const cardWidth = 340 + 24; // card width + gap
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, products.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
      return () => container.removeEventListener("scroll", checkScrollability);
    }
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 340 + 24; // card width + gap
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 364; // card width + gap
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

        {/* Products Horizontal Scroll */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm shadow-lg border border-border hover:bg-card transition-all duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm shadow-lg border border-border hover:bg-card transition-all duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 md:px-14 pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            {products.map((product, index) => (
              <ProductCardWithLeaves key={product.id} index={index}>
                <ProductCard product={product} className="min-w-[340px] max-w-[340px] snap-center flex-shrink-0" />
              </ProductCardWithLeaves>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-tea-gold hover:bg-tea-gold/10 hover:border-tea-gold shadow-lg hover-lift px-8"
            onClick={() => navigate("/products")}
          >
            <Leaf className="w-4 h-4 mr-2" />
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
