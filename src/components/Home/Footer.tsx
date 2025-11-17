import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import footer1 from "/src/assets/images/f1.png";
import footer2 from "/src/assets/images/f2.png";
import footer3 from "/src/assets/images/f3.png";
import footer4 from "/src/assets/images/f4.png";
import footer5 from "/src/assets/images/f5.png";
import footer6 from "/src/assets/images/f6.png";
import footerLogo from "/src/assets/images/footerlogo.svg";

// -------------------------------------------------------------
// Component: Footer
// -------------------------------------------------------------
const Footer: React.FC = () => {
  // Smooth-scroll to page section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="f-footer">
      <Container className="f-main">
        {/* -------------------------------------------------------
            IMAGE STRIP (Top Photo Gallery Display)
            - Highlights villa ambiance visually
            - Reordered to avoid duplicate imports
        ------------------------------------------------------- */}
        <div className="f-image-row gap-3 mb-4">
          <img src={footer1} alt="Villa view" />
          <img src={footer2} alt="Patio" />
          <img src={footer3} alt="Bedroom" />
          <img src={footer4} alt="Terrace" />
          <img src={footer5} alt="Fireplace" />
          <img src={footer6} alt="Hallway" />
          <img src={footer1} alt="Villa view" />
          <img src={footer5} alt="Fireplace" />
          <img src={footer3} alt="Bedroom" />
        </div>

        {/* -------------------------------------------------------
            CTA + BRANDING SECTION
        ------------------------------------------------------- */}
        <Row className="align-items-end footer-top-section">
          <Row className="f-plan-section w-100">
            {/* Left: Logo */}
            <Col lg={4} md={12}>
              <div className="mb-3">
                <img src={footerLogo} height={51} alt="Villas Trias Logo" />
              </div>
            </Col>

            {/* Right: CTA Block */}
            <Col lg={8} md={12}>
              <div className="f-right-header">
                <h5 className="f-cta">
                  Plan Your Escape to Unforgettable Moments
                </h5>

                <Button
                  variant="dark"
                  className="f-book-btn"
                  onClick={() =>
                    window.open(
                      "https://checkout.lodgify.com/villastrias/en/#/506741"
                    )
                  }
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>

          {/* ---------------------------------------------------
              LEFT COLUMN — About + Social Links
              - Summarizes the villa’s essence
              - Provides social proof via Instagram / Google links
          --------------------------------------------------- */}
          <Col lg={4} md={12}>
            <div className="f-brand">
              <h6 className="f-heading">Your Private Mallorcan Sanctuary</h6>

              <p className="f-text">
                A private, spacious retreat in the peaceful hills of Pollença.
                Designed for families and groups seeking comfort and natural
                beauty.
              </p>

              <p className="f-social-label">Follow our social media :</p>

              <div className="f-socials">
                <a href="#" className="f-social-btn" aria-label="Google">
                  <FaGoogle />
                </a>
                <a href="#" className="f-social-btn" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </Col>

          {/* ---------------------------------------------------
              RIGHT COLUMN — Navigation + Contact
              - Structured into 3 categories
              - Uses react-router Link for SPA navigation
          --------------------------------------------------- */}
          <Col lg={8} md={12}>
            <div className="f-right">
              {/* Divider (kept for UI consistency) */}
              <div className="f-divider" />

              <Row className="gy-4">
                {/* Quick Links */}
                <Col sm={4}>
                  <h6 className="f-link-title">Quick Links</h6>
                  <ul className="f-list">
                    <li>
                      <Link
                        to="/?#home"
                        onClick={() => scrollToSection("home")}
                      >
                        The Villa
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?#gallery-section"
                        onClick={() => scrollToSection("gallery-section")}
                      >
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?#location-section"
                        onClick={() => scrollToSection("location-section")}
                      >
                        Location
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/?#reviews"
                        onClick={() => scrollToSection("reviews")}
                      >
                        Reviews
                      </Link>
                    </li>
                  </ul>
                </Col>

                {/* Policies */}
                <Col sm={4}>
                  <h6 className="f-link-title">Details & Policies</h6>
                  <ul className="f-list">
                    <li>
                      <Link to="/privacy">Payment & Cancellation</Link>
                    </li>
                    <li>
                      <Link to="/privacy">House Rules</Link>
                    </li>
                    <li>
                      <Link to="/privacy">Mandatory Check-in</Link>
                    </li>
                    <li>
                      <Link to="/privacy">More Properties by Villas Trias</Link>
                    </li>
                  </ul>
                </Col>

              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* -------------------------------------------------------
          BOTTOM COPYRIGHT STRIP
      ------------------------------------------------------- */}
      <Container>
        <div className="f-bottom pb-2">
          <p className="f-copy">
            © {new Date().getFullYear()} Villa La Font. All rights reserved.
          </p>

          <div className="f-terms">
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Terms & Services</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
