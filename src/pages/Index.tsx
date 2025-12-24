import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";

import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sree Mohan Agri Mall | Quality Agricultural Products for Indian Farmers</title>
        <meta
          name="description"
          content="Sree Mohan Agri Mall provides premium quality agricultural products backed by Jyothir Agri Science. Solution-based approach with 16/7 support for farmers."
        />
        <meta name="keywords" content="agricultural products, farming solutions, pesticides, cotton seeds, Jyothir Agri Science, Indian farmers" />
        <link rel="canonical" href="https://agrimall.io/" />

        {/* Open Graph */}
        <meta property="og:title" content="Sree Mohan Agri Mall | Quality Agricultural Products" />
        <meta property="og:description" content="Premium agricultural products with solution-based approach. Backed by Jyothir Agri Science quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agrimall.io/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sree Mohan Agri Mall",
            "url": "https://agrimall.io",
            "logo": "https://agrimall.io/img/logo.png",
            "description": "Quality agricultural products for Indian farmers",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "15/164, Balaji Complex Gosha Hospital Road",
              "addressLocality": "Adoni",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "518301",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9493636363",
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi", "Telugu"]
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <SocialProof />
        <About />
        <Solutions />

        <Team />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
