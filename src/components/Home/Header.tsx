import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

import headerLogo from "/src/assets/images/headerLogo.png";
const Header = () => {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { language, currency, setLanguage, setCurrency } = useAppContext();
  // Check if the current route matches the nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for navbar height
      const sections = [
        "home",
        "info",
        "gallery-section",
        "booknow",
        "location-section",
        "amenities",
        "reviews",
      ];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Handle clicks outside the language dropdown
  const isActive = (path: string) => {
    return location.pathname === path || location.hash === path;
  };

  // Handle clicks outside the language & currency dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".language-dropdown") &&
        !target.closest(".currency-dropdown")
      ) {
        setShowLanguageDropdown(false);
        setShowCurrencyDropdown(false);
      }
    };

    if (showLanguageDropdown || showCurrencyDropdown) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showLanguageDropdown, showCurrencyDropdown]);
  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle language selection
  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    // Your widget initialization code that uses language and currency
    console.log("Widget updated with:", { language, currency });
  }, [language, currency]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="header-wrapper"
      style={{ width: "100%" }}
    >
      <Navbar
        expand="lg"
        className={`py-3 position-fixed w-100 ${isScrolled ? "scrolled" : ""} ${
          !visible ? "nav-hidden" : "nav-visible"
        }`}
        style={{
          zIndex: 1000,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Container>
          {/* Left Side - Logo */}
          <Navbar.Brand as={Link} to="/" className="me-0">
            <img
              src={headerLogo}
              alt="Villa La Font"
              height="51"
              className="headerLogo"
            />
          </Navbar.Brand>
          {/* Hamburger */}
          <button
            className="navbar-toggler border-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <Navbar.Toggle aria-controls="navbar-nav" className="border-0" /> */}

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            {/* Center Navigation */}
            <Nav className="mx-auto" key={activeSection}>
              <Nav.Link
                as={Link}
                to="/"
                className={`${
                  location.pathname === "/" && activeSection === "home"
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setActiveSection("home");
                  window.scrollTo(0, 0);
                }}
              >
                The Villa
              </Nav.Link>

              <Nav.Link
                href="/#gallery-section"
                className={activeSection === "gallery-section" ? "active" : ""}
                onClick={(e) => {
                  if (window.location.pathname === "/contact") {
                    e.preventDefault();
                    window.location.href = "/#gallery-section";
                  } else {
                    e.preventDefault();
                    const element = document.getElementById("gallery-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
              >
                Gallery
              </Nav.Link>

              <Nav.Link
                href="/#location-section"
                className={activeSection === "location-section" ? "active" : ""}
              >
                Location
              </Nav.Link>

              <Nav.Link
                href="/#reviews"
                className={activeSection === "reviews" ? "active" : ""}
              >
                Reviews
              </Nav.Link>

              <Nav.Link
                href="/contact"
                className={`${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact Us
              </Nav.Link>

              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    All Properties
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`ms-1 transition-transform ${
                        isPropertiesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                }
                id="properties-dropdown"
                // className="mx-3"
                show={isPropertiesOpen}
                onMouseEnter={() => setIsPropertiesOpen(true)}
                onMouseLeave={() => setIsPropertiesOpen(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPropertiesOpen(!isPropertiesOpen);
                }}
                renderMenuOnMount={true}
              >
                <NavDropdown.Item
                  as={Link}
                  to="#"
                  className={isActive("/properties/villa-1") ? "active" : ""}
                >
                  Villa 1
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="#"
                  className={isActive("/properties/villa-2") ? "active" : ""}
                >
                  Villa 2
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="#"
                  className={isActive("/properties/villa-3") ? "active" : ""}
                >
                  Villa 3
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Right Side - Buttons */}
            <Nav className="ms-auto align-items-center">
              {/* Language Selector */}
              <div className="language-dropdown position-relative">
                <button
                  className="btn btn-link d-flex align-items-center p-0 nav-link-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLanguageDropdown(!showLanguageDropdown);
                    setShowCurrencyDropdown(false); // Close currency dropdown if open
                  }}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    cursor: "pointer",
                    border: "1px solid #FFFFFF",
                    borderRadius: 0,
                    height: 35,
                  }}
                >
                  <span>{language.toUpperCase()}</span>
                  <span className="ms-1 d-flex align-items-center">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transition: "transform 0.2s ease" }}
                      className={showLanguageDropdown ? "rotate-180" : ""}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Language Dropdown Menu */}
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="position-absolute end-0 mt-2 py-2 rounded shadow-lg header-menue"
                    style={{
                      background: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minWidth: "140px",
                      zIndex: 1001,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => handleLanguageSelect("en")}
                    >
                      English
                    </button>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => handleLanguageSelect("fr")}
                    >
                      Français
                    </button>
                  </motion.div>
                )}
              </div>
              {/* Currency Selector */}
              <div className="currency-dropdown position-relative">
                <button
                  className="btn btn-link  d-flex align-items-center p-0 nav-link-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCurrencyDropdown(!showCurrencyDropdown);
                    setShowLanguageDropdown(false);
                  }}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    cursor: "pointer",
                    border: "1px solid #FFFFFF",
                    borderRadius: 0,
                    height: 35,
                  }}
                >
                  <span>{currency}</span>
                  <span className="ms-1">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transition: "transform 0.2s ease" }}
                      className={showCurrencyDropdown ? "rotate-180" : ""}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Currency Dropdown Menu */}
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="position-absolute end-0 mt-2 py-2 rounded shadow-lg header-menue"
                    style={{
                      background: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minWidth: "120px",
                      zIndex: 1001,
                    }}
                    onClick={(e) => e.stopPropagation()} // <--- prevent document handler
                  >
                    {["EUR", "USD", "GBP"].map((curr) => (
                      <button
                        key={curr} // <--- add key
                        className={`dropdown-item d-flex align-items-center ${
                          currency === curr ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent outside click close race
                          setCurrency(curr); // apply selection
                          setShowCurrencyDropdown(false); // close dropdown
                        }}
                      >
                        {curr === "EUR" ? "€" : curr === "USD" ? "$" : "£"}{" "}
                        {curr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {/* Close Button */}
              <button
                className="btn-close-white"
                onClick={() => setMenuOpen(false)}
              >
                &times;
              </button>

              <Nav className="flex-column text-center mt-5">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`${
                    location.pathname === "/" && activeSection === "home"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveSection("home");
                    window.scrollTo(0, 0);
                  }}
                >
                  The Villa
                </Nav.Link>
                <Nav.Link
                  href="/#gallery-section"
                  className={
                    activeSection === "gallery-section" ? "active" : ""
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Gallery
                </Nav.Link>
                <Nav.Link
                  href="/#location-section"
                  className={
                    activeSection === "location-section" ? "active" : ""
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Location
                </Nav.Link>
                <Nav.Link
                  href="/#reviews"
                  className={`${activeSection === "reviews" ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Reviews
                </Nav.Link>
                <Nav.Link
                  href="/contact#"
                  className={`${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Nav.Link>
                <NavDropdown
                  title="All Properties"
                  id="mobile-properties"
                  className="text-center mt-2"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="#"
                    onClick={() => setMenuOpen(false)}
                  >
                    Villa 1
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="#"
                    onClick={() => setMenuOpen(false)}
                  >
                    Villa 2
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="#"
                    onClick={() => setMenuOpen(false)}
                  >
                    Villa 3
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Language + Currency */}
                <div className="d-flex mt-4 gap-3">
                  <Nav className="d-flex flex-row">
                    {/* Language Selector */}
                    <button
                      className="btn btn-link d-flex align-items-center p-0 nav-link-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLanguageDropdown(!showLanguageDropdown);
                        setShowCurrencyDropdown(false); // Close currency dropdown if open
                      }}
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        cursor: "pointer",
                        border: "1px solid #FFFFFF",
                        borderRadius: 0,
                        height: 35,
                      }}
                    >
                      <span>{language}</span>
                      <span className="ms-1 d-flex align-items-center">
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ transition: "transform 0.2s ease" }}
                          className={showLanguageDropdown ? "rotate-180" : ""}
                        >
                          <path
                            d="M1 1.5L6 6.5L11 1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Language Dropdown Menu */}
                    {showLanguageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="position-absolute end-0 mt-2 py-2 rounded shadow-lg header-menue"
                        style={{
                          background: "rgba(0, 0, 0, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          minWidth: "140px",
                          zIndex: 1001,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => {
                            // Handle lan`guage change
                            setShowLanguageDropdown(false);
                            setLanguage("en");
                          }}
                        >
                          English
                        </button>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={() => {
                            // Handle language change
                            setShowLanguageDropdown(false);
                            setLanguage("fr");
                          }}
                        >
                          Français
                        </button>
                      </motion.div>
                    )}
                    {/* Currency Selector */}
                    <button
                      className="btn btn-link  d-flex align-items-center p-0 nav-link-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCurrencyDropdown(!showCurrencyDropdown);
                        setShowLanguageDropdown(false); // Close language dropdown if open
                      }}
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        cursor: "pointer",
                        border: "1px solid #FFFFFF",
                        borderRadius: 0,
                        height: 35,
                      }}
                    >
                      <span>{currency}</span>
                      <span className="ms-1">
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ transition: "transform 0.2s ease" }}
                          className={showCurrencyDropdown ? "rotate-180" : ""}
                        >
                          <path
                            d="M1 1.5L6 6.5L11 1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Currency Dropdown Menu */}
                    {showCurrencyDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="position-absolute end-0 mt-2 py-2 rounded shadow-lg header-menue"
                        style={{
                          background: "rgba(0, 0, 0, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          minWidth: "120px",
                          zIndex: 1001,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {["EUR", "USD", "GBP"].map((curr) => (
                          <button
                            key={curr}
                            className={`dropdown-item d-flex align-items-center ${
                              currency === curr ? "active" : ""
                            }`}
                            onClick={() => {
                              setShowCurrencyDropdown(false);
                              setCurrency(curr);
                            }}
                          >
                            {curr === "EUR" ? "€" : curr === "USD" ? "$" : "£"}{" "}
                            {curr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </Nav>
                </div>
              </Nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          padding: 15px 0;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.8) !important;
          padding: 10px 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar-toggler {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 0.5rem;
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          width: 1.5em;
          height: 1.5em;
        }

        .nav-link {
          position: relative;
          padding: 0.5rem 0.75rem !important;
          margin: 0 0.5rem;
          font-family: var(--font-primary);
          font-weight: 500; // Use numeric weight directly
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.8) !important;
          display: inline-flex;
          align-items: center;
        }
           .nav-link-btn{
           position: relative;
          padding: 0.5rem 0.75rem !important;
          margin: 0 0.5rem;
          font-family: var(--font-primary);
          font-weight: 500; // Use numeric weight directly
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.8) !important;
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
          }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #fff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 60%;
        }

        .nav-link.active {
          color: #fff !important;
          font-family: var(--font-primary);
          font-weight: 400;
        }

        .dropdown-menu {
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 0.5rem 0;
          margin-top: 0.5rem;
        }

        .dropdown-item {
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 0.5rem 1.5rem !important;
          transition: all 0.2s ease;
          position: relative;
        }

        .dropdown-item:hover,
        .dropdown-item:focus {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
        }

        .dropdown-item.active {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          font-family: var(--font-primary);
          font-weight: 500;
        }

        .dropdown-divider {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0.5rem 0;
        }

        /* Book Now button styles */
        .book-now-btn {
          border: 1px solid white !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
          color: white !important;
          text-decoration: none !important;
        }

        .book-now-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
        }

        /* Language dropdown styles */
        .rotate-180 {
          transform: rotate(180deg);
        }

        .language-dropdown .dropdown-menu {
          min-width: 140px;
          padding: 0.5rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.95);
        }

        .language-dropdown .dropdown-item {
          padding: 0.5rem 1.25rem;
          color: rgba(255, 255, 255, 0.8) !important;
          display: flex;
          align-items: center;
        }

        .language-dropdown .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
        }

        .language-dropdown .dropdown-item span {
          margin-right: 8px;
          font-size: 1.1em;
        }

        /* Responsive styles */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(0, 0, 0, 0.95);
            padding: 1rem;
            margin-top: 0.5rem;
            border-radius: 4px;
          }

          .nav-link {
            padding: 0.75rem 1rem !important;
            margin: 0.25rem 0;
          }

          .dropdown-menu {
            background: rgba(255, 255, 255, 0.05);
            border: none;
            padding-left: 1rem;
            margin: 0;
            width:100%;
          }

          .book-now-btn {
            display: inline-block;
            width: auto;
            margin: 0.5rem 0;
            text-align: center;
          }

          .language-dropdown {
            width: 100%;
            margin: 0.5rem 0;
          }

          .language-dropdown .dropdown-menu {
            position: static !important;
            transform: none !important;
            width: 100%;
            margin-top: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            border: none;
          }
        }
        .navbar .dropdown-toggle::after {
          display: none !important;
        }
          
          
          
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(0, 0, 0, 0.95);
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            max-height: 80vh;
            overflow-y: auto;
          }
        .nav-link,
          .dropdown-item {
            padding: 0.75rem 1rem !important;
            margin: 0.25rem 0;
            width: 100%;
            text-align: left;
          }

  
            .dropdown-item{
            background-color:#212529;
            margin:0;
            width:100%;
            
            }

          .dropdown-menu {
            background: rgba(255, 255, 255, 0.05) !important;
            border: none !important;
            box-shadow: none !important;
            padding-left: 1.5rem;
            margin: 0;
            z-index:1003;
          }

          /* Hide dropdown indicators on mobile */
          .dropdown-toggle::after {
            display: none !important;
          }

          /* Currency and language selectors on mobile */
          .currency-dropdown,
          .language-dropdown {
            width: 100%;
            margin: 0.5rem 0;
          }

          .language-dropdown .dropdown-menu,
          .currency-dropdown .dropdown-menu {
            position: static !important;
            transform: none !important;
            width: 100%;
            margin: 0.5rem 0 0 0;
            background: rgba(255, 255, 255, 0.05) !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Adjust the toggle button for mobile */
          .navbar-toggler {
            padding: 0.5rem;
            border: none;
          }
        }
        .transition-transform {
          transition: transform 0.3s ease;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }
        @media (max-width: 991.98px) {
           .headerLogo{
          height:40px;
          
          }
         
        #mobile-properties{
        border-top:1px solid #5D5D5D !important;
        border-bottom:1px solid #5D5D5D !important;

        width:100%
        }
          .navbar {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            padding: 10px 0 !important;
          }
          .nav-link::after {
            display: none;
          }
          .nav-link.active {
            color: #fff !important;
            font-family: var(--font-primary);
            border: 0.5px solid white;
          }
          .nav-link {
            position: relative;
            padding: 0.8rem 0.75rem !important;
            margin: 0rem;
            font-family: var(--font-primary);
            font-weight: 500; // Use numeric weight directly
            transition: all 0.3s ease;
            color: rgba(255, 255, 255, 0.8) !important;
            display: inline-flex;
            align-items: center;
            align-self: center;
          }

          .currency-dropdown,
          .language-dropdown {
            width: 100%;
            margin: 0;
            align-items: center;
          }
          .header-menue {
            border: 1px solid rgba(255, 255, 255, 0.2);
            left: 0;
          }
        }

        /* Fullscreen Menu Overlay */
        .navbar-toggler-icon{
        
        }
        .mobile-menu-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          z-index: 1200;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-menu-content {
          width: 100%;
          max-width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          padding: 2rem 1.5rem;
          position: relative;
          overflow-y: auto;
        }

        .btn-close-white {
          position: absolute;
          top: 1.2rem;
          right: 1.5rem;
          background: transparent;
          border: none;
          color: white;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
        }
          .nav-hidden {
  transform: translateY(-100%);
}

.nav-visible {
  transform: translateY(0);
}

/* Ensure smooth transition */
.navbar {
  transition: transform 0.3s ease-in-out;
}

/* Keep the existing scrolled styles */
.navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
       
      `}</style>
    </motion.div>
  );
};

export default Header;
