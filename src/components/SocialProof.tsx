import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Youtube, Facebook, Instagram, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Youtube,
    value: 252561,
    label: "YouTube Subscribers",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Facebook,
    value: 827257,
    label: "Facebook Followers",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
  },
  {
    icon: Instagram,
    value: 295577,
    label: "Instagram Followers",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

const AnimatedCounter = ({ value, inView }: { value: number; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span>{count.toLocaleString()}</span>;
};

export const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold text-sm">India's 2nd Biggest Agri Social Media Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Trusted by Thousands of Farmers
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Mohan Traders Adoni — our parent network — is one of India's leading agricultural
            social media platforms, helping farmers make informed decisions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-primary-foreground/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-primary-foreground/10 hover:border-secondary/50 transition-colors group"
            >
              <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">
                <AnimatedCounter value={stat.value} inView={isInView} />+
              </div>
              <p className="text-primary-foreground/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
