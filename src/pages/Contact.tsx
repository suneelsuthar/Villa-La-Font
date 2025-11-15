import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import "../styles/home.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import contactBg from "/src/assets/images/contactBg.png";
import phoneIcon from "/src/assets/images/phone.svg";
import emailIcon from "/src/assets/images/contact-email.svg";
const SplitText = ({
  text,
  className,
  delay = 0,
  wordDelay = 0.08,
  style,
}: any) => {
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", overflow: "hidden", ...style }}
    >
      {text.split(" ").map((word: any, i: any) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * wordDelay,
            duration: 0.9,
            ease: "backOut",
          }}
          style={{ display: "inline-block", marginRight: "8px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Contact = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <section
          className="hero-section contact-h-section position-relative text-white"
          style={{
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            className="position-absolute w-100 h-100 contact-h-section-bg"
            style={{
              backgroundImage: `url(${contactBg})`,
              backgroundSize: "cover",
              // backgroundPosition: "center",
              zIndex: -2,
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: -1,
            }}
          />
          <Container>
            <Row className="align-items-center justify-content-between">
              <Col lg={7} className="mobile-view mt-4">
                <div className="text-start">
                  <SplitText
                    text="Get in Touch with Villas Trias"
                    className="d-block font-300 h-heading mobileview-title"
                    delay={0.2}
                    style={{ letterSpacing: "0em", fontSize: "55px" }}
                  />
                  <SplitText
                    text="We’re here to help you plan your perfect Mediterranean stay. Whether you have a question or are ready to book, our team will be happy to assist you within 24 hours."
                    className="d-block font-300 hero-subtitle mobileview-subtitle"
                    delay={0.8}
                    wordDelay={0.05}
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section py-md-5 py-4">
          <Container>
            <Row className="pb-md-3">
              {/* LEFT SIDE - Contact Form */}
              <Col lg={6} className="mb-4 mb-md-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2
                    className="b-form-title mb-md-4 b-form-title-top"
                    // style={{ fontSize: 42 }}
                  >
                    GET IN TOUCH & PLAN YOUR STAY
                  </h2>
                  <p className="b-subtitle mb-4" style={{ color: "#5D5D5D" }}>
                    Have a question or ready to book your next Mallorcan escape?
                    Use the details below or send us your inquiry — our team
                    will get back to you within 24 hours.
                  </p>
                  <div className="contact-info">
                    <div className="mb-4">
                      <div
                        className="d-flex align-items-center mb-3 contact-card"
                        onClick={() => window.open("tel:+1234568900")}
                      >
                        <div className="contact-icon d-flex align-items-center justify-content-center contact-circle">
                          <img src={phoneIcon} height={21} width={21} />
                        </div>
                        <div className="contact-info-mob">
                          <span className="contact-lable">Phone</span>
                          <p
                            className="mb-0 contact-value"
                            style={{ color: "#5D5D5D" }}
                          >
                            +1 (234) 567-890
                          </p>
                        </div>
                      </div>
                      <div
                        className="d-flex align-items-center mb-3 contact-card"
                        onClick={() =>
                          window.open("mailto:contact@villastrias.com")
                        }
                      >
                        <div className="contact-icon d-flex align-items-center justify-content-center contact-circle">
                          <img src={emailIcon} height={21} width={21} />
                        </div>
                        <div className="contact-info-mob">
                          <span className="contact-lable">Email</span>
                          <p
                            className="mb-0 contact-value"
                            style={{ color: "#5D5D5D" }}
                          >
                            contact@villastrias.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* RIGHT SIDE - Contact Info */}
              <Col lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="book-inquiry-card"
                >
                  {/* <h4 className="mb-4 text-center b-form-title">
                    BOOK INQUIRY
                  </h4> */}
                  <h2
                    className="b-form-title mb-4  text-center"
                    // style={{ fontSize: 34 }}
                  >
                    BOOK INQUIRY
                  </h2>

                  <Form className="contact-form">
                    {/* Email */}
                    <Form.Group className="mb-3">
                      <Form.Label className="in-lable">Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>

                    {/* Name Fields */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="in-lable">
                            First Name
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter Name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="in-lable">
                            Last Name
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter Name" />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Dates */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="in-lable">
                            Check-in Date
                          </Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="in-lable">
                            Check-out Date
                          </Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Rental Property */}
                    <Form.Group className="mb-3">
                      <Form.Label className="in-lable">
                        Rental Property
                      </Form.Label>
                      <Form.Select>
                        <option>Select Property</option>
                        <option>Villa La Font</option>
                        <option>Casa Blanca</option>
                        <option>Can Miquelet</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Notes */}
                    <Form.Group className="mb-3">
                      <Form.Label className="in-lable">Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter"
                      />
                    </Form.Group>

                    {/* Privacy & reCAPTCHA Notice */}
                    <p
                      className="small mb-2 in-footer-text"
                      style={{ color: "#B7B6B6" }}
                    >
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a
                        href="#"
                        className="text-dark text-decoration-underline"
                      >
                        privacy policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-dark text-decoration-underline"
                      >
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>

                    {/* Checkbox */}
                    <Form.Group className="d-flex mb-4">
                      <Form.Check type="checkbox" className="me-2" />
                      <Form.Label
                        className="mb-0 small in-footer-text accept-text-mob"
                        style={{ color: "#B7B6B6" }}
                      >
                        I accept the Privacy Policy.{" "}
                        <a
                          href="#"
                          className="text-dark text-decoration-underline"
                        >
                          Privacy Policy.
                        </a>
                      </Form.Label>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                      variant="dark"
                      size="lg"
                      className="w-100 send-btn rounded-0 send-in-btn"
                    >
                      SEND INQUIRY
                    </Button>
                  </Form>
                </motion.div>
              </Col>
            </Row>
            <Row className="mt-5 align-items-center">
              <Col lg={4} md={4} sm={12} xs={12}>
                <h2
                  className="b-form-title mb-4 mx-md-0 mx-3"
                  style={{ color: "#2A2A2A" }}
                >
                  OUR LOCATION
                </h2>
              </Col>
              <Col lg={8} md={8} sm={12} xs={12}>
                <p className="booknow-description pb-3">
                  Feel completely private and peaceful in the hills, yet you are
                  just minutes from the action. The villa is perfectly located
                  to explore Pollença's historic old town, local supermarkets,
                  and the beautiful north coast.
                </p>
              </Col>
              <Col lg={12} md={12} sm={12}>
                <div className="map-container">
                  <iframe
                    title="Villa La Font Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7703.685411442059!2d3.008243011227028!3d39.87557741609948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129639a3778a62e3%3A0xa00c12e44e0f640!2sPollen%C3%A7a%2C%20Balearic%20Islands%2C%20Spain!5e0!3m2!1sen!2s!4v1730781000000!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: "15px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Col>
            </Row>
            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="mt-5 text-center">
              <h2 className="b-form-title mb-1">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="booknow-description pb-3">
                Find quick answers to common questions about your stay at Villa
                Trias.
              </p>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="faq-header-q">
                    WHAT TIME IS CHECK-IN AND CHECK-OUT?
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Check-in is from 2:00 PM, and check-out is until 10:00 AM.{" "}
                    <br />
                    Early check-in or late check-out may be available upon
                    request, depending on availability.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header className="faq-header-q">
                    WHAT IS YOUR CANCELLATION POLICY?
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Cancellations made 30 days before arrival are fully
                    refundable. After that, partial refunds may apply depending
                    on booking terms.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header className="faq-header-q">
                    HOW CAN I PAY FOR MY RESERVATION?
                  </Accordion.Header>
                <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Payments can be made via credit card, PayPal, or bank
                    transfer. A deposit may be required to confirm your booking.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header className="faq-header-q">
                    IS THERE A SECURITY DEPOSIT?
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Yes, a refundable security deposit is required at check-in
                    and returned upon check-out after inspection.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header className="faq-header-q">
                    IS THE VILLA SUITABLE FOR FAMILIES?
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Absolutely! The villa offers spacious rooms and amenities
                    perfect for families and children.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header className="faq-header-q">
                    ARE PETS ALLOWED?
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ padding: 15, paddingTop: 2, marginTop: -5 }}
                  >
                    Pets are allowed upon request. Please inform us in advance
                    so we can make necessary arrangements.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </section>
          </Container>
        </section>
      </main>
      <Footer />

      {/* Inline styling (you can move this to home.css) */}
      <style>{`
        .h-heading {
          font-size: 45px;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-weight: 300;
        }
        .hero-subtitle {
          font-size: 18px;
          max-width: 700px;
          color: #f1f1f1;
        }
        .contact-section {
          background-color: #ffffff;
        }
        .contact-title {
          font-size: 32px;
          font-weight: 600;
          color: #2c3e50;
        }
        .contact-info {
          background: #fff;
          cursor: pointer;
        }


        /* Responsive (Mobile View) */
        @media (max-width: 768px) {
      .b-form-title-top{
      margin-top:30px}
        .b-form-title{
        font-size:24px !important;
        }
          .h-heading {
            font-size: 28px;
            text-align: center;
          }
          .hero-subtitle {
            text-align: center;
            font-size: 14px !important;
          }
          .contact-title {
            text-align: center;
            font-size: 26px;
          }
          .contact-info {
            text-align: center;
          }
        }
        .contact-icon {
          width: 36px;
          height: 36px;
          background-color: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
        .contact-info-mob{
text-align:left
}
        .contact-h-section{
        min-height:399px !important;
            
             
        }
        .contact-h-section-bg{
         background-repeat: no-repeat !important;
              background-position:center !important;
                background-size: cover !important;
              z-index: -2 !important;
        
        }
          .contact-info {
            margin-bottom: 2rem;
          }
        }
        .contact-card {
          border: 1px solid #dfdfdf;
          padding: 15px;
        }
        .contact-circle {
          height: 50px;
          width: 50px;
          border-radius: 100px;
          background-color: #2a2a2a;
          color: white;
          margin-right: 5px;
        }
        .contact-lable {
          color: #5d5d5d;
          font-family: var(--font-primary);
          font-weight: var(--font-light);
          font-size: 15px;
        }
        .contact-value {
          font-family: var(--font-primary);
          font-weight: var(--font-light);
        }
        .book-inquiry-card {
          background: #fff;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
        }

        .book-inquiry-card h4 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2a2a2a;
          margin-bottom: 1rem;
        }

        .guest-selector {
          border: 1px solid #ced4da;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          width: 120px;
          justify-content: space-between;
        }

        .guest-selector button {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .position-relative {
          position: relative;
        }

        .calendar-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .form-control-lg {
          padding: 0.75rem 1rem;
          font-size: 1rem;
        }

        .btn-dark {
          background-color: #2a2a2a;
          border: none;
          padding: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-dark:hover {
          background-color: #1a1a1a;
        }
        .inquiry-title {
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 400;
        }

        .book-inquiry-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          padding: 2rem;
          box-shadow: none;
        }

        .book-inquiry-card .form-label {
          font-size: 0.9rem;
          color: #2a2a2a;
          font-weight: 500;
        }

        .book-inquiry-card .form-control,
        .book-inquiry-card select {
          border: 1px solid #e0e0e0;
          border-radius: 0;
          font-size: 0.95rem;
          padding: 0.7rem 0.9rem;
        }

        .book-inquiry-card textarea {
          resize: none;
        }

        .book-inquiry-card .send-btn {
          background-color: #2a2a2a;
          border: none;
          padding: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .book-inquiry-card .send-btn:hover {
          background-color: #000;
        }

        .book-inquiry-card a {
          color: #2a2a2a;
        }

        .book-inquiry-card a:hover {
          color: #000;
        }

        @media (max-width: 768px) {
        .in-footer-text{
        font-size:12px}
        .book-inquiry-card{
        padding:1.2rem !important
        }
        .accept-text-mob{
        font-size:14px !important
        }
        .mobileview-title{
        }
        .mobileview-subtitle{
        font-size: 14px !important;

        }
          .book-inquiry-card {
            padding: 1.5rem;
          }
        }
        .in-lable {
          font-size: 14px !important;
          color: #5d5d5d;
          font-weight: var(--font-regular) !important;
          font-family: var(--font-primary) !important;
        }
        .contact-form input,
        select,
        textarea {
          font-weight: var(--font-regular) !important;
          font-family: var(--font-primary) !important;
          font-size: 15px !important;
          accent-color: #ff4757; !important /* red */
        }
        .in-footer-text {
          font-weight: var(--font-regular) !important;
          font-family: var(--font-primary) !important;
        }
        .send-in-btn {
          height: 50px;
          font-size: 16px;
          font-weight: var(--font-regular) !important;
          font-family: var(--font-primary) !important;
        }
        input[type="checkbox"] {
          accent-color: red !important; /* Bootstrap primary blue */
        }
          .faq-section {
  text-align: left;
  margin-top: 2rem;
}

.accordion-item {
  border: 1px solid #e5e5e5 !important;
  border-radius: 4px !important;
  margin-bottom: 15px;
  background-color: #fff;
}

.accordion-button {
  font-size: 16px;
  font-weight: 500;
  color: #2a2a2a;
  text-transform: uppercase;
  padding: 18px 20px;
  background-color: #fff !important;
  box-shadow: none !important;
  border: none !important;
}

.accordion-button:not(.collapsed) {
  color: #000;
  background-color: #fff !important;
  box-shadow: none;
}

.accordion-body {
  color: #5D5D5D;
  font-size: 13px;
  padding: 15px 25px 20px 25px;
  line-height: 1.6;
  text-align:left;
  font-weight: var(--font-light) !important;
  font-family: var(--font-primary) !important;
}
.accordion-item{
border:1px solid #DFDFDF
}


.accordion-button:not(.collapsed)::after {
  transform: rotate(180deg);
}
  .faq-header-q > button{
  font-size: 18px;
  font-weight: var(--font-light) !important;
  font-family: var(--font-primary) !important;
color:#2A2A2A;
padding:15px
  }


      `}</style>
    </div>
  );
};

export default Contact;
