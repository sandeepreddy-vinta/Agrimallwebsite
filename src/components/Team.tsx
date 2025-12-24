import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "Adapa Mohan Reddy",
    role: "Managing Director",
    initials: "MR",
  },
  {
    name: "Sandeep Reddy Vinta",
    role: "CEO",
    initials: "SR",
  },
  {
    name: "Tejaswini Reddy",
    role: "Director",
    initials: "TR",
  },
  {
    name: "G Pranav Reddy",
    role: "COO",
    initials: "PR",
  },
];

// Generate a consistent color based on name
const getInitialsBgColor = (name: string) => {
  const colors = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-amber-500 to-orange-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Meet Our <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to transforming agriculture in India
            through innovation and quality.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card rounded-3xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 card-hover">
                {/* Initials Avatar */}
                <div className="relative h-48 bg-gradient-to-b from-muted to-muted/50 overflow-hidden flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getInitialsBgColor(member.name)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-2xl font-bold text-white">{member.initials}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-center -mt-6 relative">
                  <div className="bg-card rounded-2xl p-4 shadow-lg border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-accent font-medium">{member.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
