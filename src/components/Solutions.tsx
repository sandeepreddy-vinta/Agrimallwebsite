import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animated Icon Components with Flaticon-style colorful designs
const AnimatedQualityIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Shield Base */}
    <motion.path
      d="M32 4L8 14v18c0 14.4 10.4 27.2 24 30 13.6-2.8 24-15.6 24-30V14L32 4z"
      fill="#16A34A"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M32 8L12 16v14c0 12 8.8 22.8 20 25.2V8z"
      fill="#22C55E"
    />
    {/* Checkmark */}
    <motion.path
      d="M26 32l-6-6 2.5-2.5L26 27l11.5-11.5L40 18 26 32z"
      fill="#FFFFFF"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
    />
  </motion.svg>
);

const AnimatedDeliveryIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Truck Body */}
    <motion.g
      animate={{ x: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
    >
      <rect x="4" y="22" width="36" height="24" rx="3" fill="#F97316" />
      <rect x="8" y="26" width="28" height="16" rx="2" fill="#FDBA74" />
      {/* Cabin */}
      <path d="M40 26h14l6 12v8H40V26z" fill="#3C4778" />
      <rect x="44" y="30" width="10" height="8" rx="1" fill="#93C5FD" />
    </motion.g>
    {/* Wheels */}
    <motion.circle
      cx="16" cy="50" r="7"
      fill="#3C4778"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      style={{ transformOrigin: "16px 50px" }}
    />
    <circle cx="16" cy="50" r="3" fill="#FFFFFF" />
    <motion.circle
      cx="48" cy="50" r="7"
      fill="#3C4778"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      style={{ transformOrigin: "48px 50px" }}
    />
    <circle cx="48" cy="50" r="3" fill="#FFFFFF" />
    {/* Package */}
    <motion.rect
      x="14" y="28" width="12" height="10" rx="1"
      fill="#FCD34D"
      animate={{ y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
    />
  </motion.svg>
);

const AnimatedSupportIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Headband */}
    <path
      d="M12 36V28C12 17 21 8 32 8s20 9 20 20v8"
      fill="none"
      stroke="#3C4778"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Left Ear */}
    <motion.rect
      x="6" y="32" width="14" height="22" rx="6"
      fill="#6366F1"
      animate={{ scaleY: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
      style={{ transformOrigin: "13px 43px" }}
    />
    {/* Right Ear */}
    <motion.rect
      x="44" y="32" width="14" height="22" rx="6"
      fill="#6366F1"
      animate={{ scaleY: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }}
      style={{ transformOrigin: "51px 43px" }}
    />
    {/* Mic */}
    <motion.g
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
      style={{ transformOrigin: "13px 54px" }}
    >
      <path d="M13 54v8l10 4" fill="none" stroke="#3C4778" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="66" r="5" fill="#22C55E" />
    </motion.g>
  </motion.svg>
);

const AnimatedVideoIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Monitor */}
    <rect x="4" y="8" width="48" height="36" rx="4" fill="#EC4899" />
    <rect x="8" y="12" width="40" height="28" rx="2" fill="#F9A8D4" />
    {/* Play Button */}
    <motion.path
      d="M24 20v16l14-8z"
      fill="#FFFFFF"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
      style={{ transformOrigin: "31px 28px" }}
    />
    {/* Recording Dot */}
    <motion.circle
      cx="14" cy="18" r="3"
      fill="#EF4444"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
    {/* Stand */}
    <rect x="22" y="44" width="12" height="6" rx="1" fill="#3C4778" />
    <rect x="16" y="50" width="24" height="6" rx="2" fill="#3C4778" />
  </motion.svg>
);

const AnimatedExpertIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Glow Effect */}
    <motion.circle
      cx="32" cy="28" r="24"
      fill="#FEF3C7"
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    />
    {/* Bulb */}
    <circle cx="32" cy="28" r="18" fill="#FBBF24" />
    <ellipse cx="32" cy="24" rx="10" ry="8" fill="#FDE68A" />
    {/* Base */}
    <rect x="24" y="46" width="16" height="4" rx="1" fill="#9CA3AF" />
    <rect x="26" y="50" width="12" height="4" rx="1" fill="#6B7280" />
    <rect x="28" y="54" width="8" height="4" rx="2" fill="#4B5563" />
    {/* Light Rays */}
    <motion.g
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
      style={{ transformOrigin: "32px 28px" }}
    >
      <rect x="30" y="0" width="4" height="8" rx="2" fill="#FBBF24" />
      <rect x="52" y="26" width="8" height="4" rx="2" fill="#FBBF24" />
      <rect x="4" y="26" width="8" height="4" rx="2" fill="#FBBF24" />
      <rect x="48" y="8" width="4" height="8" rx="2" fill="#FBBF24" transform="rotate(45 50 12)" />
      <rect x="12" y="8" width="4" height="8" rx="2" fill="#FBBF24" transform="rotate(-45 14 12)" />
    </motion.g>
  </motion.svg>
);

const AnimatedCommunityIcon = () => (
  <motion.svg viewBox="0 0 64 64" className="w-10 h-10">
    {/* Center Person */}
    <motion.g
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      style={{ transformOrigin: "32px 40px" }}
    >
      <circle cx="32" cy="22" r="10" fill="#14B8A6" />
      <ellipse cx="32" cy="48" rx="14" ry="12" fill="#14B8A6" />
    </motion.g>
    {/* Left Person */}
    <motion.g
      animate={{ x: [-2, 0, -2] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <circle cx="12" cy="28" r="7" fill="#F97316" />
      <ellipse cx="12" cy="46" rx="9" ry="8" fill="#F97316" />
    </motion.g>
    {/* Right Person */}
    <motion.g
      animate={{ x: [2, 0, 2] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <circle cx="52" cy="28" r="7" fill="#6366F1" />
      <ellipse cx="52" cy="46" rx="9" ry="8" fill="#6366F1" />
    </motion.g>
    {/* Connection Lines */}
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <line x1="22" y1="36" x2="18" y2="38" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="42" y1="36" x2="46" y2="38" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="3 2" />
    </motion.g>
  </motion.svg>
);

const solutions = [
  {
    Icon: AnimatedQualityIcon,
    title: "100% Quality Assurance",
    description: "Every product is tested and certified by Jyothir Agri Science to ensure maximum effectiveness for your crops.",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    Icon: AnimatedDeliveryIcon,
    title: "Online Door Delivery",
    description: "Order via call at 9493636363 or online and get products delivered directly to your doorstep.",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    Icon: AnimatedSupportIcon,
    title: "16/7 Call Center Support",
    description: "Round-the-clock expert guidance from our dedicated call center team whenever you need help.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    Icon: AnimatedVideoIcon,
    title: "Strong Online Promotion",
    description: "Learn farming techniques and product usage through our extensive video library on social media.",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    Icon: AnimatedExpertIcon,
    title: "Expert Guidance",
    description: "Get personalized crop solutions and recommendations from agricultural experts.",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    Icon: AnimatedCommunityIcon,
    title: "Community Network",
    description: "Join India's 2nd largest agri social network and connect with fellow farmers.",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
];

export const Solutions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Solutions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Why Choose <span className="text-gradient">Sree Mohan Agri Mall</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We take a solution-based approach to farming — combining quality products with
            expert guidance and continuous support.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border hover:border-accent/50 transition-all duration-500 card-hover">
                {/* Animated Icon */}
                <div className={`w-16 h-16 rounded-xl ${solution.bgColor} ${solution.borderColor} border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <solution.Icon />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
