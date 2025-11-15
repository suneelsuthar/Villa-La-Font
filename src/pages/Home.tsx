// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
import { useEffect } from "react";

// Components
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Info from "../components/Home/Info";
import Gallery from "../components/Home/Gallery";
import BookNow from "../components/Home/BookNow";
import Location from "../components/Home/Location";
import Amenities from "../components/Home/Amenities";
import Reviews from "../components/Home/Reviews";
import Reserve from "../components/Home/Reserve";
import PolicyAndNotes from "../components/Home/PolicyAndNotes";
import CookieConsent from "../components/Home/CookieConsent";
import Footer from "../components/Home/Footer";

// Styles
import "../styles/home.css";

// Context & Services
import { useAppContext } from "../context/AppContext";
import { propertyService } from "../services/propertyService";

// -------------------------------------------------------------
// Component: Home Page
// -------------------------------------------------------------
const Home: React.FC = () => {
  const { setAvailabilities } = useAppContext();

  // -----------------------------------------------------------
  // Fetch property availability on mount
  // -----------------------------------------------------------
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await propertyService.checkPropertyAvailability();
        setAvailabilities(data);
        console.log("Property Availability:", data);
      } catch (error) {
        console.error("Error fetching property availability:", error);
      }
    };

    fetchAvailability();
  }, [setAvailabilities]);

  // -----------------------------------------------------------
  // Smooth scrolling for anchor links
  // -----------------------------------------------------------
  useEffect(() => {
    // Function to handle smooth scroll
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Attach event listeners to all anchor links starting with "#"
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) =>
      anchor.addEventListener("click", handleAnchorClick)
    );

    // Cleanup: remove all event listeners
    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);

  // -----------------------------------------------------------
  // Render Home Page
  // -----------------------------------------------------------
  return (
    <div className="home-page">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <Info />
        <Gallery />
        <BookNow />
        <Location />
        <Amenities />
        <Reviews />
        <Reserve />
        <PolicyAndNotes />
      </main>

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
