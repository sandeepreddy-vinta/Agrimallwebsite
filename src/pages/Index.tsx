import { useHead } from "@/hooks/use-head";
import { COMPANY } from "@/config/company";
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
  // Keep the title and description here in step with the static tags in
  // index.html — those are what a crawler reads before React mounts.
  useHead({
    title: `${COMPANY.legalName} | Quality Agricultural Products for Indian Farmers`,
    description:
      "Sree Mohan Agri Mall supplies seeds, crop protection, plant nutrition and farm equipment to farmers across Andhra Pradesh, Telangana and Karnataka, backed by Jyothir Agri Science and 16/7 agronomy support.",
    canonical: "https://agrimall.io/",
    keywords:
      "agricultural products, farming solutions, pesticides, cotton seeds, Jyothir Agri Science, Indian farmers",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: COMPANY.legalName,
      url: "https://agrimall.io",
      logo: "https://agrimall.io/logo.png",
      description: "Quality agricultural products for Indian farmers",
      address: {
        "@type": "PostalAddress",
        ...COMPANY.postalAddress,
      },
      email: COMPANY.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY.phoneDisplay,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
    },
  });

  return (
    <>
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
