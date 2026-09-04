import { useHead } from "@/hooks/use-head";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/config/company";
import { Section, SubHeading, Bullets, InfoTable } from "@/components/Legal";

const LAST_UPDATED = "28 August 2026";

const Privacy = () => {
  useHead({
    title: `Privacy Policy | ${COMPANY.legalName}`,
    description:
      "How Sree Mohan Agri Mall collects, uses, shares and protects personal information on agrimall.io, the Agrimall app, and our WhatsApp and call centre channels.",
    canonical: "https://agrimall.io/privacy",
  });

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        <article className="container mx-auto px-4 max-w-4xl py-14">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {LAST_UPDATED}</p>

          <Section id="who-we-are" title="1. Who we are">
            <p>
              This website, <strong>agrimall.io</strong>, the Agrimall mobile application and our WhatsApp and
              telephone support channels are owned and operated by <strong>{COMPANY.legalName}</strong> ("Agrimall",
              "we", "our" or "us"), a partnership firm registered in India carrying on the business of retail and
              online sale of agricultural inputs &mdash; seeds, crop protection products, plant nutrition, tools and
              farm equipment &mdash; to farmers and agri-retailers.
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
              We are the data fiduciary for the personal data described in this policy, within the meaning of India's
              Digital Personal Data Protection Act, 2023.
            </p>
          </Section>

          <Section id="scope" title="2. What this policy covers">
            <p>This policy applies to personal information we collect when you:</p>
            <Bullets
              items={[
                "browse or place an order on agrimall.io or the Agrimall app;",
                "message us on WhatsApp, or receive a WhatsApp message from us;",
                "call, or are called by, our agronomy and order support call centre;",
                "register as a farmer, or as a dealer or business partner in our network;",
                "visit one of our stores and ask us to record your order or crop details.",
              ]}
            />
            <p>
              It does not cover websites or services operated by other companies that we link to. Their own policies
              apply there.
            </p>
          </Section>

          <Section id="what-we-collect" title="3. Information we collect">
            <SubHeading>Identity and contact information</SubHeading>
            <Bullets
              items={[
                "Your name, mobile number and, where you give it, your email address.",
                "Your village, mandal, district and state, and the delivery address you enter.",
                "The preferred language you choose (Telugu, Kannada, Hindi or English).",
              ]}
            />

            <SubHeading>Farming information</SubHeading>
            <Bullets
              items={[
                "The crops you grow, sowing dates, acreage and the pest or disease problems you describe to us.",
                "Advice, product recommendations and dosage guidance we give you in response.",
              ]}
            />
            <p>
              You give us this so that our agronomists can recommend the right product and dose. You can use the store
              and place orders without it.
            </p>

            <SubHeading>Order, delivery and payment information</SubHeading>
            <Bullets
              items={[
                "Products ordered, quantities, prices, invoices and order history.",
                "Delivery address, delivery status and the courier's tracking updates.",
                "Payment status, transaction reference and payment method.",
              ]}
            />
            <p>
              <strong>We do not store your card number, UPI PIN, CVV or net-banking credentials.</strong> Payments are
              collected on the systems of our payment gateway partners, who are PCI-DSS compliant; we receive only the
              result of the transaction and a reference number.
            </p>

            <SubHeading>WhatsApp messaging information</SubHeading>
            <Bullets
              items={[
                "The WhatsApp phone number you message us from, and your WhatsApp profile name.",
                "The content of the messages, images and voice notes you send us — including photographs of crops, pest damage, market price boards and bills.",
                "Delivery, read and reply status of messages we send you, and the template message that was sent.",
                "Your opt-in and any later opt-out.",
              ]}
            />

            <SubHeading>Call centre information</SubHeading>
            <Bullets
              items={[
                "Your phone number, the time and duration of the call, and which agent handled it.",
                <>
                  <strong>Call recordings and agent notes.</strong> Calls to and from our support numbers are recorded
                  for order accuracy, agronomy advice quality and staff training. You are informed of this at the start
                  of the call and may ask us not to record.
                </>,
              ]}
            />

            <SubHeading>Dealer and business partner information</SubHeading>
            <p>
              If you join our dealer network (including the Jyothir Business Partner programme) we additionally collect
              your firm's name, GSTIN, licence details, business address, contact persons, purchase and sales history,
              and the incentive and credit position of your account.
            </p>

            <SubHeading>Device and usage information</SubHeading>
            <Bullets
              items={[
                "Device model, operating system version and app version.",
                "A push-notification token, if you allow notifications.",
                "Pages viewed, products viewed and searches made, together with your IP address.",
                "Approximate location, only where you grant it, and only to show nearby stores, delivery availability and local market prices.",
              ]}
            />

            <SubHeading>Cookies</SubHeading>
            <p>
              agrimall.io uses cookies and similar browser storage to keep you signed in, remember your cart and
              language, and understand which pages are used. You can block or delete cookies in your browser; parts of
              the site, including checkout, may then not work.
            </p>
          </Section>

          <Section id="how-we-use" title="4. How we use your information">
            <InfoTable
              head={["Purpose", "Information used"]}
              rows={[
                ["Creating and securing your account; verifying your mobile number by OTP", "Name, mobile number, device information"],
                ["Taking, packing, delivering and invoicing your order", "Contact, address, order, payment and delivery information"],
                ["Giving crop advice and recommending products and doses", "Farming information, call and message content"],
                ["Sending order confirmations, dispatch and delivery updates, and payment receipts", "Mobile number, WhatsApp number, order information"],
                ["Sending market prices, seasonal crop advisories and offers, where you have opted in", "Mobile number, WhatsApp number, crop and location information"],
                ["Answering your questions on WhatsApp, by phone and by email", "Message content, call recordings, order history"],
                ["Handling returns, complaints, product quality claims and refunds", "Order, payment and communication records"],
                ["Preventing fraud, misuse and abuse of offers and incentives", "Account, device, order and transaction information"],
                ["Meeting our obligations under tax, GST, insecticide, seed and fertiliser law", "Invoice, batch, licence and transaction records"],
                ["Improving our products, catalogue, app and advice quality", "Usage information and aggregated, de-identified order data"],
              ]}
            />
            <p>
              We process this information on the basis of the consent you give us when you create an account, place an
              order or opt in to messages, and, where applicable, to perform our contract with you and to comply with
              Indian law. <strong>We do not sell your personal information to anyone.</strong>
            </p>
          </Section>

          <Section id="whatsapp" title="5. WhatsApp messages — opt-in and opt-out">
            <p>
              We use the WhatsApp Business Platform, provided by Meta Platforms, Inc., to send and receive messages.
              This section explains exactly how that works, because it is the channel most of our customers use.
            </p>
            <Bullets
              items={[
                <>
                  <strong>We message you only after you opt in.</strong> You opt in by messaging us first, by ticking
                  the consent box at checkout or registration, by giving your number to our staff and agreeing to
                  WhatsApp updates, or by clicking a "Chat on WhatsApp" button on our website or in an advertisement.
                </>,
                <>
                  <strong>What we send.</strong> Order confirmations, payment receipts, dispatch and delivery updates,
                  replies to your questions, and &mdash; separately, and only if you opted in to them &mdash; market
                  price updates, crop advisories and promotional offers.
                </>,
                <>
                  <strong>How to stop.</strong> Reply <strong>STOP</strong> to any of our WhatsApp messages, tell our
                  agent on a call, or write to{" "}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary underline">
                    {COMPANY.email}
                  </a>
                  . We will stop promotional messages immediately. We may still send you messages that relate to an
                  order you have placed, until that order is complete.
                </>,
                <>
                  <strong>Meta's role.</strong> Messages between you and us are transmitted and processed by Meta
                  through the WhatsApp Business Platform, and are handled in accordance with the{" "}
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    WhatsApp Privacy Policy
                  </a>
                  . We store the message content in our own systems in India so that our agents can see your history
                  and serve you better.
                </>,
                <>
                  <strong>What we will not do.</strong> We do not use your WhatsApp number for anything other than the
                  purposes listed above, and we do not share it with other businesses for their own marketing.
                </>,
              ]}
            />
          </Section>

          <Section id="sharing" title="6. Who we share information with">
            <p>
              We share personal information only with service providers who need it to do a job for us, and only to the
              extent needed for that job. They are bound to keep it confidential and to use it for no other purpose.
            </p>
            <InfoTable
              head={["Who", "What for"]}
              rows={[
                ["Meta Platforms (WhatsApp Business Platform)", "Sending and receiving WhatsApp messages"],
                ["Payment gateway partners", "Collecting payments and processing refunds"],
                ["Courier and logistics partners, and our own delivery staff", "Delivering your order and confirming receipt"],
                ["SMS and OTP gateway providers", "Sending verification codes and transactional SMS"],
                ["Push notification providers", "Sending app notifications"],
                ["Cloud telephony providers", "Routing and recording call centre calls"],
                ["Amazon Web Services", "Hosting our systems and storing data and documents"],
                ["Our dealers and business partners", "Only your name, contact number and the order details needed to fulfil or service an order in your area"],
                ["Chartered accountants, auditors and legal advisers", "Statutory audit, tax filing and legal advice"],
                ["Government authorities and courts", "Where we are required by law to disclose, or to establish or defend a legal claim"],
              ]}
            />
            <p>
              Our systems and data are hosted in India. Some of our service providers may process information on
              servers outside India under their own terms.
            </p>
          </Section>

          <Section id="retention" title="7. How long we keep it">
            <Bullets
              items={[
                <>
                  <strong>Account and profile information</strong> &mdash; while your account is active, and for three
                  years after your last order or interaction.
                </>,
                <>
                  <strong>Order, invoice and payment records</strong> &mdash; eight years, as required under GST and
                  income tax law.
                </>,
                <>
                  <strong>Batch, licence and product traceability records</strong> &mdash; as required under the
                  Insecticides Act, Seeds Act and Fertiliser Control Order.
                </>,
                <>
                  <strong>WhatsApp and other message history</strong> &mdash; twenty-four months from the date of the
                  message.
                </>,
                <>
                  <strong>Call recordings</strong> &mdash; twelve months, unless the call relates to an open complaint
                  or claim, in which case until it is resolved.
                </>,
                <>
                  <strong>Website and app usage logs</strong> &mdash; twelve months.
                </>,
              ]}
            />
            <p>After these periods we delete the information or keep it only in de-identified form.</p>
          </Section>

          <Section id="security" title="8. How we protect it">
            <Bullets
              items={[
                "Traffic between your device and our servers is encrypted using TLS.",
                "Passwords are stored only as salted one-way hashes, never in readable form.",
                "Access to customer data is restricted to the staff whose work requires it, and is logged.",
                "Our infrastructure is protected by firewalls, access keys and regular backups.",
              ]}
            />
            <p>
              No system can be guaranteed completely secure. If a breach affects your personal data, we will notify you
              and the Data Protection Board of India as the law requires.
            </p>
          </Section>

          <Section id="your-rights" title="9. Your rights">
            <p>Under the Digital Personal Data Protection Act, 2023, you may:</p>
            <Bullets
              items={[
                <>
                  <strong>Ask what we hold</strong> about you, and how we have used and shared it.
                </>,
                <>
                  <strong>Correct or complete</strong> anything that is wrong or out of date.
                </>,
                <>
                  <strong>Ask us to erase</strong> your personal data, where we are not required by law to keep it.
                </>,
                <>
                  <strong>Withdraw your consent</strong> at any time &mdash; including consent to WhatsApp and
                  promotional messages. Withdrawing consent does not affect anything we did lawfully before you
                  withdrew it.
                </>,
                <>
                  <strong>Nominate</strong> another person to exercise these rights on your behalf if you die or become
                  incapacitated.
                </>,
                <>
                  <strong>Complain</strong> to us, and then to the Data Protection Board of India if you are not
                  satisfied.
                </>,
              ]}
            />
            <p>
              Write to{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-primary underline">
                {COMPANY.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${COMPANY.phoneHref}`} className="text-primary underline">
                {COMPANY.phoneDisplay}
              </a>
              . We will respond within 30 days. We may ask you to verify your mobile number before we act, so that we
              do not disclose your information to someone else.
            </p>
          </Section>

          <Section id="children" title="10. Children">
            <p>
              Our services are meant for adults. We do not knowingly collect personal data from children under 18. If
              you believe a child has given us personal data, write to us and we will delete it.
            </p>
          </Section>

          <Section id="changes" title="11. Changes to this policy">
            <p>
              We may update this policy from time to time. The current version is always on this page with the date it
              was last updated. If a change materially affects how we use your information, we will tell you by
              WhatsApp, SMS or email before it takes effect.
            </p>
          </Section>

          <Section id="grievance" title="12. Grievance officer">
            <p>
              In accordance with the Information Technology Act, 2000 and the rules made under it, and the Digital
              Personal Data Protection Act, 2023, the contact for privacy questions, requests and complaints is:
            </p>
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

export default Privacy;
