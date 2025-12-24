import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/farmer-hero.png";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Happy South Indian farmer using smartphone to order agricultural products online"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Quality Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Backed by Jyothir Agri Science Quality
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Solution-Based
            <br />
            <span className="text-secondary">Agricultural Excellence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl"
          >
            Empowering farmers with premium quality products and expert guidance.
            We don't just sell products — we deliver complete farming solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 group"
            >
              Explore Solutions
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="hero"
            >
              Contact Us
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">100% Quality Assured</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Truck className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">Door Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">16/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delivery Journey Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center px-4"
      >
        <div className="flex items-center gap-2 sm:gap-4 bg-primary-foreground/10 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-full border border-primary-foreground/20 max-w-[90vw] sm:max-w-none">
          {/* Warehouse */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/90 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Animated Path with Moving Truck */}
          <div className="relative w-20 sm:w-32 md:w-40 h-6 flex items-center">
            {/* Road/Path */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-primary-foreground/30 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-secondary/30 to-transparent rounded-full" />
            </div>

            {/* Moving Truck */}
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                repeatType: "loop"
              }}
              className="absolute left-0"
              style={{ width: "100%" }}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Customer Home */}
          <div className="flex flex-col items-center flex-shrink-0">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/90 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2.5 }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.div>
          </div>
        </div>


      </motion.div>
    </section>
  );
};
