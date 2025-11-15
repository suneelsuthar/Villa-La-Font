import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import "../styles/home.css";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import privacyBg from "/src/assets/images/privacyBg.png";
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
          style={{ display: "inline-block", marginRight: "4px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Privacy = () => {
  const privacyData = [
    {
      title: "DATA COLLECTION",
      content:
        "We collect certain personal information when you interact with our website, such as your name, email address, and booking details. We use this information to provide you with our services and enhance your experience.",
    },
    {
      title: "USE OF COOKIES",
      content: (
        <>
          We use cookies to improve the functionality and performance of our
          website. By continuing to use the site, you agree to the use of
          cookies in accordance with our{" "}
          <a href="/cookies" className="link">
            cookie policy
          </a>
          .
        </>
      ),
    },
    {
      title: "DATA SECURITY",
      content:
        "We take measures to protect your personal data and ensure its security. We do not share your information with third parties without your consent, except when necessary to provide our services or comply with the law.",
    },
    {
      title: "YOUR RIGHTS",
      content: (
        <>
          You have the right to access, correct, or delete your personal data.
          If you wish to exercise these rights or have any questions about our
          privacy policy, contact us at{" "}
          <a href="mailto:contact@villastrias.com" className="link">
            contact@villastrias.com
          </a>
          .
        </>
      ),
    },
    {
      title: "CONSENT",
      content:
        "By continuing to use our website, you give your consent to the collection and use of your personal data in accordance with this privacy policy.",
    },
  ];

  return (
    <div className="home-page">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          className="hero-section position-relative text-white"
          style={{
            minHeight: "387px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage: `url(${privacyBg})`,
              backgroundPosition: "center",
              zIndex: -2,
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
            <Row className="align-items-center justify-content-between mt-5">
              <Col lg={7} className="mobile-view">
                <div className="text-start">
                  <SplitText
                    text="PRIVACY CONSENT"
                    className={`d-block font-300 h-heading m-0 p-0 mobileview-title`}
                    style={{
                      fontSize: "55px",
                    }}
                    delay={0.2}
                  />
                  <SplitText
                    text="By using our website, you agree to our privacy policy. Below, we provide information on how we collect, use, and protect your personal data."
                    className={`d-block font-300 hero-subtitle  m-0 mobileview-subtitle`}
                    delay={0.8}
                    wordDelay={0.05}
                    style={{ fontSize: 18 }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* PRIVACY CONTENT SECTION */}
        <section className="privacy-section py-md-5 mt-4">
          <Container>
            {privacyData.map((item, index) => (
              <div
                key={index}
                className="privacy-block  border-bottom mb-3 pb-2"
              >
                <h4 className="privacy-title">{item.title}</h4>
                <p className="privacy-text">{item.content}</p>
              </div>
            ))}
          </Container>
        </section>
      </main>
      <Footer />

      <style>{`
        .privacy-section {
          background: #fff;
        }
        .privacy-block:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .privacy-title {
          font-size: 30px;
          font-weight: 300;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: #1a1a1a;
          font-family: var(--font-primary);
        }
        .privacy-text {
          color: #5d5d5d;
          line-height: 1.6;
          font-size: 18px;
          font-family: var(--font-primary);
        }
        .link {
          color: #000;
          text-decoration: underline;
        }
        .h-heading {
          font-size: 45px;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .h-heading {
            font-size: 28px;
            text-align: center;
            letter-spacing:0.1rem
          }
          .hero-subtitle {
            text-align: center;
            font-size: 14px;
          }
        }
          .h-heading {
  letter-spacing: 0em;
}

      `}</style>
    </div>
  );
};

export default Privacy;
