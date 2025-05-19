import { ReactNode } from "react";
import { useColor } from "../../hooks/ui/useColor";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PrivacyPolicy = () => {
  const { textColor, bgColor, pColor } = useColor();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className={cn(
        textColor,
        bgColor,
        "w-full py-4 mt-10  max-xs:px-0 backdrop-blur-md bg-opacity-90"
      )}
    >
      <motion.div
        className="py-4  mx-auto rounded-xl shadow-2xl p-8 bg-white/10 dark:bg-black/20 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 mt-4 text-center sm:text-left  "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={cn("text-center sm:text-left text-sm mb-12", pColor)}
        >
          <span data-tooltip-id="lastUpdated" className="cursor-help ">
            Last Updated:
          </span>{" "}
          <strong>1 May 2025</strong>
        </motion.p>

        <Tooltip
          id="lastUpdated"
          place="top"
          content="We'll keep this up to date when policies change."
        />

        <motion.p className="mb-6 leading-relaxed" variants={fadeUp}>
          <strong>Eventurelly Inc. </strong>(“Eventurelly”, “we”, “us”, or
          “our”) is committed to protecting the privacy of our users. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website and use our corporate
          team-building event booking services.
        </motion.p>

        {/* SECTIONS */}
        <Section title="1. Information We Collect">
          <Text title="We may collect and process the following types of personal information:">
            <Subsection title="a. Corporate Account Data">
              <List
                items={[
                  "Company name",
                  "Admin contact name",
                  "Email address",
                  "Phone number",
                  "Billing address",
                  "Company size and industry",
                ]}
              />
            </Subsection>

            <Subsection title="b. Booking Details">
              <List
                items={[
                  "Event type selected",
                  "Number of participants",
                  "Optional services selected",
                  "Event preferences",
                ]}
              />
            </Subsection>

            <Subsection title="c. User Activity">
              <List
                items={[
                  "Login timestamps",
                  "Event participation",
                  "Communication with Eventurelly team",
                  "Feedback or survey responses",
                ]}
              />
            </Subsection>

            <Subsection title="d. Automatically Collected Data">
              <List
                items={[
                  "IP address",
                  "Browser type and version",
                  "Device information",
                  "Cookies and tracking technology data",
                ]}
              />
            </Subsection>
          </Text>
        </Section>

        <Section title="2. How We Use Your Information">
          <Text title="We use your information to: ">
            <List
              items={[
                "Create and manage your corporate account",
                "Facilitate booking and organization of events",
                "Communicate with you regarding booked events",
                "Provide support and customer service",
                "Send promotional communications (only with consent)",
                "Comply with legal obligations",
              ]}
            />
          </Text>
        </Section>

        <Section title="3. Sharing Your Information">
          <p className="mb-4">
            We do <strong>not sell</strong> your personal data. We may share data with:
          </p>
          <List
            items={[
              <> <strong>Event partners or vendors</strong> who assist in organizing events</>,
              <> <strong>Payment processors</strong> (e.g., Stripe, PayPal)</>,
              <> <strong>IT service providers</strong>(hosting, analytics) </>,
              <> <strong>Legal authorities</strong>when required by law </>,
            ]}
           
          />
        </Section>

        <Section title="4. Data Retention">
          <p>
            We retain your data as long as needed to provide services, resolve
            disputes, comply with legal obligations, and enforce our agreements.
          </p>
        </Section>

        <Section title="5. Cookies & Tracking Technologies">
          <Text title="We use cookies for: ">
            <List
              items={[
                "Website functionality",
                "Analytics and performance (Google Analytics, etc.)",
                "Improving user experience",
              ]}
            />
            <p>You can manage cookie preferences in your browser settings.</p>
          </Text>
        </Section>

        <Section title="6. Your Data Rights">
          <Text title="Depending on your location, you may have the right to:">
            <List
              items={[
                "Access your data",
                "Correct your data",
                "Delete your account and data",
                "Object to or restrict processing",
                "Withdraw consent",
              ]}
            />
            <p>
              Requests can be made by contacting:{" "}
              <a
                className="text-primary underline"
                href="mailto:privacy@eventurelly.com"
              >
                <strong> privacy@eventurelly.com</strong>
              </a>
            </p>
          </Text>
        </Section>

        <Section title="7. Data Security">
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, loss, or
            misuse.
          </p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>
            Our website may link to third-party websites or services. We are not
            responsible for their privacy practices.
          </p>
        </Section>

        <Section title="9. Children’s Privacy">
          <p>
            Eventurelly is intended for corporate use only and is{" "}
            <strong>not designed for individuals under the age of 18.</strong>
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with a revised “Last Updated” date.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            For questions or concerns, contact:
            <br />
            <strong>Eventurelly Inc.</strong>
            <br />
            <strong>
              Email:{" "}
              <a
                className="text-primary underline"
                href="mailto:privacy@eventurelly.com"
              >
                privacy@eventurelly.com
              </a>
            </strong>
          </p>
        </Section>
      </motion.div>
    </motion.div>
  );
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <motion.div
    className="mb-10"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
  >
    <h2 className="text-2xl font-semibold mb-4 ">{title}</h2>
    {children}
  </motion.div>
);

type TextProps = {
  title: string;
  children?: ReactNode;
};

export const Text: React.FC<TextProps> = ({ title, children }) => (
  <motion.div
    className="mb-10"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
  >
    <p className="mb-3">{title}</p>
    {children}
  </motion.div>
);

type SubsectionProps = {
  title: string;
  children: ReactNode;
};

export const Subsection: React.FC<SubsectionProps> = ({ title, children }) => (
  <motion.div className="mb-6" variants={fadeUp}>
    <h3 className="text-xl font-semibold  mb-2 ">{title}</h3>
    {children}
  </motion.div>
);

type ListProps = {
  items: React.ReactNode[];
};

export const List: React.FC<ListProps> = ({ items }) => (
  <motion.ul className="list-disc list-inside space-y-2 pl-2" variants={fadeUp}>
    {items.map((item, index) => (
      <li key={index} className=" transition-colors duration-200">
        {item}
      </li>
    ))}
  </motion.ul>
);

export default PrivacyPolicy;
