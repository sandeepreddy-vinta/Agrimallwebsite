import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Youtube, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/config/company";

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/#about" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Products", href: "/#products" },
  { name: "Our Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
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
            <p className="text-primary-foreground/60 text-sm mb-6 leading-relaxed">
              agrimall.io is owned and operated by{" "}
              <span className="text-primary-foreground/90 font-medium">{COMPANY.legalName}</span>,{" "}
              {COMPANY.entityType}.
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.instagram}
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
                    href="/#products"
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
                <address className="not-italic text-primary-foreground/80 text-sm">
                  <span className="block font-medium text-primary-foreground/90">{COMPANY.legalName}</span>
                  {COMPANY.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li>
                <a href={`tel:${COMPANY.phoneHref}`} className="flex gap-3 items-center text-primary-foreground/80 hover:text-secondary transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex gap-3 items-center text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  <Mail className="w-5 h-5 shrink-0 text-secondary" />
                  {COMPANY.email}
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
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-primary-foreground/60">
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <span>GSTIN: {COMPANY.gstin}</span>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <span className="flex items-center gap-2">
                Powered by <span className="text-secondary font-semibold">Jyothir Agri Science</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
