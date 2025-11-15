import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import paymentIcon from "/src/assets/images/payment.png";
import additionalIcon from "/src/assets/images/additional.png";
import checkinIcon from "/src/assets/images/checkin.png";
import cancelIcon from "/src/assets/images/cancel.png";

// Define the structure for the PolicyCard
type PolicyCardProps = {
  icon: string;
  title: string;
  notes: string[];
  customDelay: number;
};

const PolicyCard = ({ icon, title, notes, customDelay }: PolicyCardProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: customDelay * 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      custom={customDelay}
      variants={fadeUp as any}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="pn-card"
    >
      <div className="pn-card-header">
        <img src={icon} className="pn-icon" alt={title} />
        <h4 className="pn-card-title">{title}</h4>
      </div>
      <div className="pn-divider" />
      {notes.map((note, index) => (
        <p key={index} className="pn-note">
          {note}
        </p>
      ))}
    </motion.div>
  );
};

const PolicyAndNotes = () => {
  return (
    <section className="pn-section py-5">
      <Container>
        <div className="text-center pn-title" style={{ marginBottom: 45 }}>
          <h2 className="sec-title policy-notes">
            YOUR STAY: POLICIES & NOTES
          </h2>
          <p className="booknow-description policy-notes">
            Everything you need to know for a seamless experience
          </p>
        </div>

        <Row className="g-4 justify-content-between mb-2">
          <Col lg={6} md={12}>
            <PolicyCard
              icon={checkinIcon}
              title="CHECK-IN & CHECK-OUT"
              customDelay={0}
              notes={[
                "Check-in: 2:00 PM",
                "Check-out: 10:00 AM",
                "Early check-in or late check-out may be available upon request, subject to availability.",
              ]}
            />
          </Col>

          <Col lg={6} md={12}>
            <PolicyCard
              icon={cancelIcon}
              title="CANCELLATION POLICY"
              customDelay={1}
              notes={[
                "Full refund: Cancel 60+ days before arrival",
                "No refund: Cancel less than 60 days before arrival",
                "We recommend travel insurance for unexpected changes to your plans.",
              ]}
            />
          </Col>

          <Col lg={6} md={12}>
            <PolicyCard
              icon={paymentIcon}
              title="PAYMENT SCHEDULE"
              customDelay={2}
              notes={[
                "At booking: 50% of total amount",
                "Before arrival: Remaining 50% due 7 days prior",
                "Security deposit: €698 pre-authorization held 1 day before arrival",
              ]}
            />
          </Col>

          <Col lg={6} md={12}>
            <PolicyCard
              icon={additionalIcon}
              title="ADDITIONAL FEES"
              customDelay={3}
              notes={[
                "Cleaning fee: Applies for 3–4 day reservations",
                "Tourist tax: Paid during online check-in (required by Balearic law)",
                "All fees will be clearly communicated before booking confirmation.",
              ]}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PolicyAndNotes;
