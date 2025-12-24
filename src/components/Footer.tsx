import { motion } from "framer-motion";
import { Youtube, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Products", href: "#products" },
  { name: "Our Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const products = [
  "Insecticides",
  "Fungicides",
  "Herbicides",
  "Cotton Seeds",
  "Pheromone Traps",
  "Gumme Sheets",
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <img
                  src="/logo.png"
                  alt="Sree Mohan Agri Mall"
                  className="h-20 w-auto"
                />
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Products manufactured with highest quality standards, backed by Jyothir Agri Science.
              Providing quality products to farmers across India.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@mohanagrimalltelugu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/MohanAgriMallTelugu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mohanagrimalltelugu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-secondary" />
                <span className="text-primary-foreground/80 text-sm">
                  15/164, Balaji Complex Gosha Hospital Road, Adoni-518301, Kurnool District, A.P.
                </span>
              </li>
              <li>
                <a href="tel:+919493636363" className="flex gap-3 items-center text-primary-foreground/80 hover:text-secondary transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                  +91 9493636363
                </a>
              </li>
              <li>
                <a href="mailto:sreemohanagrimall@gmail.com" className="flex gap-3 items-center text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  <Mail className="w-5 h-5 shrink-0 text-secondary" />
                  sreemohanagrimall@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Sree Mohan Agri Mall. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-2">
              Powered by <span className="text-secondary font-semibold">Jyothir Agri Science</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
