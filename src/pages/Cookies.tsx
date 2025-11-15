import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import "../styles/home.css";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import cookiesBg from "/src/assets/images/cookiesBg.png";

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

const Cookies = () => {
  const cookiesData = [
    {
      title: "WHAT ARE COOKIES?",
      content:
        "Cookies are small text files that are stored on your device when you visit a website. They are widely used to enhance your online experience by enabling websites to remember your preferences, improve performance, and provide analytics.",
    },
    {
      title: "HOW WE USE COOKIES",
      content: (
        <>
          We use cookies for the following purposes:
          <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the proper functioning of our website. They enable you to
              navigate our site and use essential features.
            </li>
            <li>
              <strong>Analytical/Performance Cookies:</strong> We use these
              cookies to analyze how visitors use our website, track the
              performance of our pages, and gather aggregate data for
              statistical purposes.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> These cookies allow us to
              remember your preferences and provide enhanced features, such as
              personalized content.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> Some cookies on our site may
              come from third-party services, such as analytics providers or
              advertisers. We do not control these cookies; please refer to the
              respective third-party privacy policies.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "YOUR COOKIE CHOICES",
      content:
        "By using our website, you consent to the use of cookies as described in this policy. You can control and manage your cookie preferences through your browser settings. Please note that blocking certain types of cookies may impact your experience on our site.",
    },
    {
      title: "CHANGES TO THIS POLICY",
      content:
        "We may update our Cookies Policy from time to time to reflect changes in our practices and services. Any updates will be posted on this page, so we encourage you to review this policy periodically.",
    },
    {
      title: "CONTACT US",
      content: (
        <>
          If you have any questions about our Cookies Policy, please contact us
          at{" "}
          <a href="mailto:contact@villastrias.com" className="cookie-link">
            contact@villastrias.com
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="cookies-page">
      <Header />

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
            backgroundImage: `url(${cookiesBg})`,
            backgroundSize: "cover",
            zIndex: -2,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: -1,
          }}
        />
        <Container className="mt-5">
          <div className="text-start">
            <SplitText
              text="COOKIES POLICY"
              className="d-block h-heading font-300 mobileview-title"
              delay={0.2}
              style={{
                fontSize: "55px",
              }}
            />
          </div>
        </Container>
      </section>

      {/* COOKIES CONTENT */}
      <section className="cookies-content py-md-5 py-4">
        <Container>
          {cookiesData.map((item, index) => (
            <div
              key={index}
              className={`cookies-block ${
                index < cookiesData.length - 1 ? "border-bottom" : ""
              } pb-4 mb-4`}
            >
              <h4 className="cookies-title">{item.title}</h4>
              <p className="cookies-text">{item.content}</p>
            </div>
          ))}
        </Container>
      </section>

      <Footer />

      {/* Inline Styles (use CSS file in production) */}
      <style>{`
        .cookies-content {
          background: #ffffff;
        }
        .cookies-title {
          font-size: 30px !important;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: #1a1a1a;
          font-family: var(--font-primary);
          font-size: 18px;
          font-weight: 300;
        }
        .cookies-text {
          color: #5d5d5d;
          line-height: 1.7;
          font-size: 18px;
          font-family: var(--font-primary);
        }
        .cookie-link {
          color: #000;
          text-decoration: underline;
        }
        .cookies-block {
          border-color: #e5e5e5 !important;
        }
        .h-heading {
          font-size: 42px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 300;
          margin-bottom: 1rem;
        }
        .hero-subtitle {
          font-size: 17px;
          font-weight: 300;
          max-width: 600px;
          color: #ddd;
        }
        ul {
          list-style-type: disc;
        }
        .cookies-block strong {
          font-weight: 500 !important;
        }
        .cookies-block li {
          font-weight: 300 !important;
        }
      `}</style>
    </div>
  );
};

export default Cookies;
