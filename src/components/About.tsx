import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Award, Leaf, HeartHandshake } from "lucide-react";
import farmerCareImage from "@/assets/farmer-care.jpg";

const features = [
  {
    icon: Award,
    title: "Jyothir Agri Science Quality",
    description: "All products manufactured with highest quality standards and rigorous testing.",
  },
  {
    icon: Leaf,
    title: "Solution-Based Approach",
    description: "We don't just sell products — we provide complete farming solutions tailored to your needs.",
  },
  {
    icon: HeartHandshake,
    title: "Farmer-First Philosophy",
    description: "Our mission is to uplift farmers' lives through quality products and expert guidance.",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={farmerCareImage}
                alt="Farmer caring for plants"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Quality Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-hero-gradient rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality Certified</p>
                  <p className="font-bold text-foreground">Jyothir Agri Science</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              We Provide Quality Products to
              <span className="text-gradient"> the Farmers</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Sree Mohan Agri Mall products are manufactured with the highest quality standards.
              We are associated with India's leading manufacturers to provide quality products to farmers,
              backed by the trusted name of Jyothir Agri Science.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Premium Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Farmers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">16/7</p>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
