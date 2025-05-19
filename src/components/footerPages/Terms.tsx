import React, { ReactNode } from "react";
import { useColor } from "../../hooks/ui/useColor";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

type ListProps = {
  items: string[];
};

export const List: React.FC<ListProps> = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 ">
    {items.map((item, index) => (
      <li
        key={index}
        className="hover:translate-x-1 transition-transform duration-200"
      >
        {item}
      </li>
    ))}
  </ul>
);
const Terms = () => {
  const { textColor, bgColor, pColor } = useColor();
  const textTop = `Please read these Terms and Conditions (“Terms”) carefully before using the Eventurelly platform.
  By creating a corporate account, booking events, or using our website, you (“You” or “Corporate Client”) agree to be bound by these Terms.`;

  return (
    <div className={cn(textColor, bgColor, "w-full py-4 mt-10  max-xs:px-0 ")}>
      <div className="py-4  mx-auto">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center sm:text-left"
        >
          Terms and Conditions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={cn("text-center sm:text-left text-sm mb-4", pColor)}
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

        <div className="mb-12">
          {textTop.split("\n").map((line, i) => (
            <p key={i} className="mb-4">
              {line}
            </p>
          ))}
        </div>

        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-12"
          >
            <Section title={section.title}>
              {section.content}
            </Section>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Static Section Data ---
const sections = [
  {
    title: "1. Platform Overview",
    content: (
      <p>
        Eventurelly provides a platform for corporate clients to book
        team-building events and engagement services.
      </p>
    ),
  },
  {
    title: "2. Account Registration",
    content: (
   <>
      <p className="mb-3">To access services, you must:</p>
      <List
        items={[
          "Be a legal representative of a company",
          "Provide accurate and complete information",
          "Maintain the confidentiality of your account credentials",
        ]}
      />
   </>
    ),
  },
  {
    title: "3. Event Booking",
    content: (
    <>
      <p className="mb-3">Once you book an event:</p>
      <List
        items={[
          "You agree to the listed pricing and terms",
          "Our team will contact you for further planning and coordination",
          "Some services are managed by us; others may be outsourced to vetted vendors",
          "Optional services must be selected during booking",
        ]}
      />
    </>
    ),
  },
  {
    title: "4. Pricing & Payment",
    content: (
      <List
        items={[
          "Prices are listed in CAD (Canadian Dollars).",
          "Payment must be made via approved methods",
          "Invoices are issued upon booking confirmation",
          "Full payment or a deposit may be required to confirm the event",
        ]}
      />
    ),
  },
  {
    title: "5. Cancellation & Refund Policy",
    content: (
      <List
        items={[
          "Cancellations made 14 days before the event: Full refund",
          "Cancellations within 7–13 days: 50% refund",
          "Cancellations less than 7 days: No refund",
          "Refunds exclude any non-refundable third-party costs or deposits",
        ]}
      />
    ),
  },
  {
    title: "6. Client Responsibilities",
    content: (
      <>
      <p className="mb-3">The corporate client must:</p>
      <List
        items={[
          "Provide accurate team details (headcount, preferences)",
          "Ensure participants follow event guidelines",
          "Notify us promptly of any changes",
        ]}
      />
      </>
     
    ),
  },
  {
    title: "7. Eventurelly Responsibilities",
    content: (
  <>
      <p className="mb-3">We will:</p>
      <List
        items={[
          "Organize and manage selected event services",
          "Coordinate with vendors and venues as required",
          "Communicate any service limitations prior to event confirmation",
        ]}
      />
  </>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
     <>
          <p className="mb-3">Eventurelly shall not be liable for:</p>
      <List
        items={[
          "Indirect or consequential damages",
          "Delays or non-performance due to force majeure events (e.g., weather, strikes, government actions)",
          "Damages caused by third-party vendors",
        ]}
      />
     </>
    ),
  },
  {
    title: "9. Intellectual Property",
    content: (
      <p>
        All content on the platform, including event formats, branding, and
        documentation, remains the intellectual property of Eventurelly.
      </p>
    ),
  },
  {
    title: "10. Termination",
    content: (
      <>
        <p className="mb-3" >Eventurelly reserves the right to:</p>,
        <List
          items={[
            "Terminate access for violation of these Terms",
            "Modify or discontinue any feature or service with notice",
          ]}
        />
        ,
      </>
    ),
  },
  {
    title: "11. Governing Law",
    content: <p>These Terms are governed by the laws of Canada.</p>,
  },
  {
    title: "12. Dispute Resolution",
    content: (
      <>
        <p className="mb-3">Disputes shall be resolved via:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Good faith negotiations</li>
          <li
            dangerouslySetInnerHTML={{
              __html:
                "If unresolved, through arbitration in <strong>Ontario, Canada.</strong>",
            }}
          />
        </ul>
      </>
    ),
  },

  {
    title: "13. Amendments",
    content: (
      <p>
        Eventurelly may update these Terms from time to time. Continued use of
        the platform constitutes acceptance of the new Terms.
      </p>
    ),
  },
  {
    title: "14. Contact Us",
    content: (
      <p className="mb-3">
        For questions regarding these Terms:
        <br />
        <strong>Eventurelly Inc.</strong>
        <br />
        <strong>Email:{" "}</strong>
        <a
          href="mailto:support@eventurelly.com"
          className="text-primary underline"
        >
          <strong>support@eventurelly.com</strong>
        </a>
      </p>
    ),
  },
];

// --- Components ---
type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="transition duration-300">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4 ">{title}</h2>
    <div className="pl-2 md:pl-4  text-base leading-relaxed">{children}</div>
  </div>
);

export default Terms;
