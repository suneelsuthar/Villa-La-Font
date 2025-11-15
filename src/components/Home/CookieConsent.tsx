import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
const CookieConsent: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  // Check localStorage on mount
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    // Only show banner if no prior choice
    if (!consent) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  // -----------------------------------------------------------
  // Handle Accept
  // -----------------------------------------------------------
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
    document.body.style.overflow = "auto";
  };

  // -----------------------------------------------------------
  // Handle Reject
  // -----------------------------------------------------------
  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShow(false);
    document.body.style.overflow = "auto";
  };

  // If not visible, stop rendering
  if (!show) return null;

  // -----------------------------------------------------------
  // UI
  // -----------------------------------------------------------
  return (
    <div className="cookie-overlay">
      <motion.div
        className="cookie-banner-modal"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container>
          {/* ---------------------------------------------------
              COOKIE TEXT AREA
          --------------------------------------------------- */}
          <Row className="align-items-center">
            <Col md={12} className="cookie-text">
              <h5 className="mb-2 cookies-title">This website uses cookies</h5>

              <p className="cookies-title-desc">
                We use cookies and similar technologies to improve your browsing
                experience, analyze site traffic, and personalize content. You
                can customize your cookie preferences below. Please note that
                blocking some types of cookies may impact your experience on our
                website and the services we offer. For more information, read
                our{" "}
                <a href="/cookies" className="cookie-link">
                  Cookie Policy
                </a>
                .
              </p>
            </Col>
          </Row>

          {/* ---------------------------------------------------
              ACTION BUTTONS
          --------------------------------------------------- */}
          <Row className="justify-content-end">
            <Col
              md={5}
              className="d-flex justify-content-end align-items-center gap-2 mt-3 mt-md-0"
            >
              <Button
                className="cookies-btn cookies-rejected-btn"
                onClick={handleReject}
              >
                Reject All
              </Button>

              <Button className="cookies-btn" onClick={handleAccept}>
                Accept All
              </Button>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default CookieConsent;
