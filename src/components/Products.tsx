import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Ladio", description: "Chlorpyrifos 50% Cypermethrin 5% EC", image: "https://agrimall.io/img/Ladio.png" },
  { name: "Bombus", description: "Lambda cyhalothrin 5% EC", image: "https://agrimall.io/img/Bombus.png" },
  { name: "Eager", description: "Thiamethoxam 25% WG", image: "https://agrimall.io/img/Eager.png" },
  { name: "Carmine", description: "Carbendazim 12% + Mencozeb 63% WP", image: "https://agrimall.io/img/Carmine.png" },
  { name: "Yellow Gumme Sheets", description: "Pest Control Gumme Sheets", image: "https://agrimall.io/img/Yellow%20Gumme%20Sheets.png" },
  { name: "Blue Gumme Sheets", description: "Pest Control Gumme Sheets", image: "https://agrimall.io/img/Blue%20Gumme%20Sheets.png" },
  { name: "PBW Kit", description: "Pheromone Traps", image: "https://agrimall.io/img/PBW%20Kit.png" },
  { name: "Kesari 99", description: "Premium Cotton Seeds", image: "https://agrimall.io/img/Kesari%2099.png" },
  { name: "Sugriva 11", description: "Cotton Seeds", image: "https://agrimall.io/img/Sugriva%2011.png" },
  { name: "Royston", description: "Diafenthiuron 47.8% w/w SC", image: "https://agrimall.io/img/Royston.png" },
  { name: "Felton", description: "Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC", image: "https://agrimall.io/img/Felton.png" },
  { name: "Musker", description: "Tolfenpyrad 15% EC", image: "https://agrimall.io/img/Musker.png" },
];

export const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <section id="products" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Premium Quality <span className="text-gradient">Agricultural Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Backed by Jyothir Agri Science quality standards, our products are designed 
            to maximize your crop yield and protect your harvest.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 card-hover">
                {/* Product Image */}
                <div className="relative h-48 bg-muted/50 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Quality Assured
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {products.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {showAll ? "Show Less" : "View All Products"}
              <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${showAll ? "rotate-90" : "group-hover:translate-x-1"}`} />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
