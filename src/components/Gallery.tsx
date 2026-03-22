import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import img1 from "@/assets/Gallery/full product line.jpeg";
import img2 from "@/assets/Gallery/OBT.jpeg";
import img3 from "@/assets/Gallery/OGT.jpeg";
import img4 from "@/assets/Gallery/OBT Back.jpeg";
import img5 from "@/assets/Gallery/OGT Back.jpeg";

export const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, span: "col-span-1 md:col-span-2 row-span-2", height: "h-96 md:h-full", src: img1, alt: "Full product line" },
    { id: 2, span: "col-span-1 row-span-1", height: "h-64", src: img2, alt: "Orthodox Black Tea" },
    { id: 3, span: "col-span-1 row-span-1", height: "h-64", src: img3, alt: "Orthodox Green Tea" },
    { id: 4, span: "col-span-1 md:col-span-2 row-span-1", height: "h-64", src: img4, alt: "Orthodox Black Tea Packaging" },
    { id: 5, span: "col-span-1 row-span-1", height: "h-64", src: img5, alt: "Orthodox Green Tea Packaging" },
  ];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              Our <span className="bg-gradient-green bg-clip-text text-transparent">Gallery</span>
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-gold rounded-full gold-shimmer" />
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A visual journey through our verdant estates and the art of tea making.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`relative group overflow-hidden rounded-2xl bg-muted/40 border border-border/50 cursor-pointer ${item.span} ${item.height}`}
            >
              <img 
                src={item.src} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-tea-gold/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 transition-colors"
            onClick={showPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] w-full px-16 outline-none flex items-center justify-center">
            <img 
              src={galleryItems[selectedIndex].src} 
              alt={galleryItems[selectedIndex].alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 transition-colors"
            onClick={showNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </section>
  );
};
