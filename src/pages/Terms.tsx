import { useHead } from "@/hooks/use-head";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SubHeading, Bullets, InfoTable } from "@/components/Legal";
import { COMPANY } from "@/config/company";

const LAST_UPDATED = "28 August 2026";

const Terms = () => {
  useHead({
    title: `Terms of Service | ${COMPANY.legalName}`,
    description:
      "The terms on which Sree Mohan Agri Mall sells agricultural inputs and provides agronomy guidance through agrimall.io, the Agrimall app, WhatsApp and our call centre.",
    canonical: "https://agrimall.io/terms",
  });

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        <article className="container mx-auto px-4 max-w-4xl py-14">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {LAST_UPDATED}</p>

          <Section id="about" title="1. About these terms">
            <p>
              These terms govern your use of <strong>agrimall.io</strong>, the Agrimall mobile application, and the
              orders you place with us by website, app, WhatsApp, telephone or in store. They are an agreement between
              you and <strong>{COMPANY.legalName}</strong> ("Agrimall", "we", "our" or "us"), {COMPANY.entityType}.
            </p>
            <InfoTable
              rows={[
                ["Legal entity", `${COMPANY.legalName} (partnership firm)`],
                ["Registered office", COMPANY.addressCertified],
                ["GSTIN", COMPANY.gstin],
                [
                  "Email",
                  <a href={`mailto:${COMPANY.email}`} className="text-primary underline">
                    {COMPANY.email}
                  </a>,
                ],
                [
                  "Telephone",
                  <a href={`tel:${COMPANY.phoneHref}`} className="text-primary underline">
                    {COMPANY.phoneDisplay}
                  </a>,
                ],
                [
                  "WhatsApp",
                  <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {COMPANY.whatsappDisplay}
                  </a>,
                ],
              ]}
            />
            <p>
              By placing an order or using our services you accept these terms. If you do not accept them, please do
              not use the service. Please also read our{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>
              , which explains how we handle your information.
            </p>
          </Section>

          <Section id="eligibility" title="2. Who may use the service">
            <Bullets
              items={[
                "You must be 18 or older and able to enter into a contract under Indian law.",
                "You must give us accurate details — your name, mobile number and delivery address — and keep them up to date. We deliver to the address you give us.",
                "You are responsible for activity on your account and for the OTP sent to your mobile number. Tell us immediately if someone else has used your account.",
                "We serve customers in Andhra Pradesh, Telangana and Karnataka. We may decline or cancel orders for addresses outside the areas we deliver to.",
              ]}
            />
          </Section>

          <Section id="products" title="3. Products and descriptions">
            <p>
              We sell seeds, crop protection products, plant nutrition, tools and farm equipment. Product photographs,
              pack sizes and descriptions are provided in good faith, but packaging and formulations change from batch
              to batch. <strong>The label on the pack you receive is authoritative</strong>, not the description on our
              website or app.
            </p>
            <Bullets
              items={[
                "Availability is not guaranteed. Seasonal shortages are common in agricultural inputs, and we may substitute an equivalent product only with your agreement.",
                "We may limit quantities per customer, particularly during peak season or where a product is in short supply.",
                "Colours and pack images on screen may differ from the physical product.",
              ]}
            />
          </Section>

          <Section id="regulated" title="4. Regulated products — important">
            <p>
              Insecticides, fungicides, herbicides, seeds and fertilisers are regulated in India under the Insecticides
              Act 1968, the Seeds Act 1966 and the Fertiliser (Control) Order 1985. We sell them under our licences,
              and the following conditions apply to every such sale.
            </p>
            <Bullets
              items={[
                <>
                  <strong>Use strictly as labelled.</strong> Follow the dose, crop, target pest, waiting period and
                  safety directions printed on the pack. Wear the protective equipment the label specifies.
                </>,
                <>
                  <strong>Not for resale.</strong> You may not resell products bought from us unless you hold the
                  licence the law requires for that product and category.
                </>,
                <>
                  <strong>Keep away from children, food and livestock feed.</strong> Store in the original labelled
                  container. Dispose of empty containers as the label directs — never reuse them.
                </>,
                <>
                  <strong>Seeds carry no yield guarantee.</strong> Germination and yield depend on soil, weather,
                  irrigation, sowing practice and pest pressure. Our liability for seed is governed by the Seeds Act
                  and the terms printed on the seed pack.
                </>,
                <>
                  <strong>In case of exposure or poisoning</strong>, stop work, follow the first-aid directions on the
                  label and seek medical help immediately, taking the pack or label with you.
                </>,
              ]}
            />
          </Section>

          <Section id="advice" title="5. Agronomy advice">
            <p>
              Our call centre, WhatsApp channel and staff offer crop guidance to help you choose and use products. This
              guidance is given in good faith on the information you describe to us &mdash; usually over the phone or
              from a photograph &mdash; and is <strong>general recommendation, not a professional diagnosis</strong>.
            </p>
            <p>
              Field results depend on rainfall, temperature, soil condition, water quality, spray equipment, timing and
              the accuracy of the problem you describe. We do not guarantee a yield, a cure or a particular outcome. For
              a serious or unusual crop problem, please also consult your local Krishi Vigyan Kendra or agricultural
              extension officer.
            </p>
          </Section>

          <Section id="pricing" title="6. Prices, taxes and payment">
            <Bullets
              items={[
                "Prices are in Indian Rupees and include GST unless stated otherwise. Your tax invoice shows the GST breakdown.",
                "Prices can change without notice. The price that applies is the one shown when we confirm your order.",
                "If a product is listed at an obviously incorrect price because of a data or typing error, we may cancel the order and refund you in full rather than supply at that price.",
                "We accept UPI, cards, net banking and, in areas where we offer it, cash on delivery. Online payments are processed by our payment gateway partners; we never see or store your card number, UPI PIN or net-banking credentials.",
                "Dealer and business partner accounts may operate on separate agreed credit terms, which prevail over this section.",
              ]}
            />
          </Section>

          <Section id="orders" title="7. Orders, confirmation and cancellation">
            <p>
              Your order is an offer to buy. A contract is formed only when we confirm the order by SMS, WhatsApp or
              app notification. Until then we may decline it &mdash; for example if the product is out of stock, the
              delivery address is outside our service area, or we cannot verify your details.
            </p>
            <Bullets
              items={[
                "You may cancel a prepaid order before dispatch for a full refund. Contact us on the number or email above.",
                "Once an order has been dispatched it can only be handled under the returns section below.",
                "We may cancel an order at any stage if it appears fraudulent, abuses a promotion, or breaches these terms. Any amount you have paid is refunded in full.",
              ]}
            />
          </Section>

          <Section id="delivery" title="8. Delivery">
            <Bullets
              items={[
                "Delivery timelines given at checkout are estimates. Rural deliveries, monsoon conditions and peak sowing season can add time.",
                "Someone aged 18 or over must be available at the address to receive the goods. We may ask for the OTP sent to your mobile as proof of delivery.",
                "Risk in the goods passes to you on delivery.",
                "If delivery fails because the address was wrong or nobody was available after reasonable attempts, we may charge the cost of re-delivery.",
              ]}
            />
          </Section>

          <Section id="returns" title="9. Returns, replacements and refunds">
            <SubHeading>What we will always put right</SubHeading>
            <Bullets
              items={[
                "The wrong product was delivered.",
                "The product arrived damaged, leaking or with a broken seal.",
                "The product was past its expiry date on the day it was delivered.",
              ]}
            />
            <p>
              Tell us within <strong>48 hours</strong> of delivery, with photographs of the product, the batch number
              and the outer packaging. We will replace the item or refund you in full, including the delivery charge.
            </p>

            <SubHeading>What we cannot take back</SubHeading>
            <Bullets
              items={[
                "Agrochemicals and seeds whose seal has been opened, once they leave our control we cannot verify storage or handling, and the law does not permit us to resell them.",
                "Products damaged by incorrect storage, mixing or application after delivery.",
                "Requests made more than 48 hours after delivery, except where a statutory right applies.",
              ]}
            />
            <p>
              Approved refunds are made to the original payment method within 7 to 10 working days. Cash-on-delivery
              refunds are made by bank transfer or UPI to an account in your name.
            </p>
            <p>
              Nothing in this section limits your rights under the Consumer Protection Act, 2019, or under the
              Insecticides Act and Seeds Act where a product is found not to conform to its declared specification.
            </p>
          </Section>

          <Section id="liability" title="10. Our responsibility to you">
            <p>
              We take care to supply genuine products from licensed manufacturers, stored and handled properly. If a
              product we supplied is defective, we will replace it or refund it as set out above.
            </p>
            <p>
              To the extent permitted by law, and except where a loss is caused by our negligence or by a product not
              conforming to its declared specification, our liability arising out of any order is limited to the amount
              you paid for the product concerned. We are not liable for crop loss, reduced yield or loss of profit
              arising from the way a product was stored, mixed or applied after delivery, or from weather, soil or pest
              conditions outside our control.
            </p>
            <p>Nothing in these terms excludes any liability that cannot be excluded under Indian law.</p>
          </Section>

          <Section id="communications" title="11. Messages from us">
            <p>
              When you place an order or opt in, we send you order confirmations, dispatch and delivery updates,
              payment receipts, and &mdash; only if you asked for them &mdash; market prices, crop advisories and
              offers, by WhatsApp, SMS, app notification or email.
            </p>
            <p>
              Reply <strong>STOP</strong> to any WhatsApp message, tell our agent on a call, or write to{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-primary underline">
                {COMPANY.email}
              </a>{" "}
              to stop promotional messages. Messages about an order you have placed continue until that order is
              complete. See our{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>{" "}
              for the detail.
            </p>
          </Section>

          <Section id="conduct" title="12. How you may use the service">
            <p>You agree not to:</p>
            <Bullets
              items={[
                "place orders using someone else's identity, payment method or mobile number;",
                "resell products in breach of the licensing rules in section 4;",
                "abuse promotions, referral schemes or dealer incentives, including by creating multiple accounts;",
                "copy, scrape or republish our product data, photographs, videos or advisory content for a competing service;",
                "attempt to interfere with, probe or overload our website, app or systems.",
              ]}
            />
            <p>
              We may suspend or close an account that breaches these terms, and pursue any legal remedy available to
              us.
            </p>
          </Section>

          <Section id="ip" title="13. Intellectual property">
            <p>
              The Agrimall and Sree Mohan Agri Mall names and logos, the website and app design, our photographs,
              videos and written advisory content belong to us or to our licensors. Manufacturer brand names and
              product images belong to their respective owners and are shown to identify the products we sell.
            </p>
            <p>
              You may share our public advisory videos and posts as published. You may not use our name or logo to
              suggest an association, dealership or endorsement that does not exist.
            </p>
          </Section>

          <Section id="thirdparty" title="14. Other companies' services">
            <p>
              Our service uses payment gateways, courier partners, cloud telephony and the WhatsApp Business Platform,
              and links to third-party websites and app stores. Those services operate under their own terms. We are
              not responsible for their content or availability, though we remain responsible to you for the order
              itself.
            </p>
          </Section>

          <Section id="changes" title="15. Changes to these terms">
            <p>
              We may update these terms. The current version is always on this page with the date it was last updated.
              Changes apply to orders placed after they are published; they do not change the terms of an order we have
              already confirmed. Where a change materially affects you, we will tell you by WhatsApp, SMS or email.
            </p>
          </Section>

          <Section id="law" title="16. Governing law and disputes">
            <p>
              These terms are governed by the laws of India. Please contact us first &mdash; almost everything is
              settled with a phone call. If a dispute cannot be resolved, the courts at Adoni, Andhra Pradesh have
              jurisdiction, without affecting your right as a consumer to approach the consumer forum for the district
              where you live.
            </p>
          </Section>

          <Section id="contact" title="17. Contact and grievances">
            <InfoTable
              rows={[
                ["Grievance Officer", COMPANY.grievanceOfficer],
                [COMPANY.legalName, COMPANY.addressCertified],
                [
                  "Email",
                  <a href={`mailto:${COMPANY.email}`} className="text-primary underline">
                    {COMPANY.email}
                  </a>,
                ],
                [
                  "Telephone",
                  <a href={`tel:${COMPANY.phoneHref}`} className="text-primary underline">
                    {COMPANY.phoneDisplay}
                  </a>,
                ],
                ["Hours", "Monday to Saturday, 9:00 am to 6:00 pm IST"],
              ]}
            />
            <p>We acknowledge every complaint within 24 hours and resolve it within 15 days.</p>
          </Section>
        </article>

        <Footer />
      </main>
    </>
  );
};

export default Terms;
