import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Story } from "@/components/Story";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { TeaLeafRain } from "@/components/TeaLeafRain";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TeaLeafRain />
      <Navigation />
      <main>
        <Hero />
        <div id="products">
          <Products />
        </div>
        <div id="story">
          <Story />
        </div>
        <div id="process">
          <Process />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
