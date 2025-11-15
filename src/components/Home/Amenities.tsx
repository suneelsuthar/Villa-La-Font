// -----------------------------
// Import Assets
// -----------------------------
import am1 from "/src/assets/images/am-1.svg";
import am2 from "/src/assets/images/am-2.svg";
import am3 from "/src/assets/images/am-3.svg";
import am4 from "/src/assets/images/am-4.svg";
import am5 from "/src/assets/images/am-5.svg";
import am6 from "/src/assets/images/am-6.svg";
import am7 from "/src/assets/images/am-7.svg";
import am8 from "/src/assets/images/am-8.svg";
import am9 from "/src/assets/images/am-9.svg";
import am10 from "/src/assets/images/am-10.svg";
import am11 from "/src/assets/images/am-11.svg";
import am12 from "/src/assets/images/am-12.svg";

import "bootstrap/dist/css/bootstrap.min.css";

// -----------------------------
// Types
// -----------------------------

/** Amenity item structure */
interface Amenity {
  icon: string;  // SVG icon path
  title: string; // Amenity display title
}

// -----------------------------
// Amenities Data
// -----------------------------
const amenities: Amenity[] = [
  { icon: am1, title: "Full Air Conditioning" },
  { icon: am2, title: "High-Speed Wireless Internet" },
  { icon: am3, title: "Washing Machine" },
  { icon: am4, title: "Roofed Car Port" },
  { icon: am5, title: "Accessible 24/7" },
  { icon: am6, title: "Charcoal BBQ Grill" },
  { icon: am7, title: "Cozy Fireplace" },
  { icon: am8, title: "Premium Bed Linen & Towel Sets" },
  { icon: am9, title: "Private Swimming Pool" },
  { icon: am10, title: "Private Garden & Backyard" },
  { icon: am11, title: "Fully Equipped Kitchen" },
  { icon: am12, title: "Outdoor Dining Area" },
];

// -----------------------------
// Component: Amenities Section
// -----------------------------
const Amenities: React.FC = () => {
  return (
    <section className="am-section text-center py-5" id="amenities">
      <div className="container">
        
        {/* Section Title */}
        <h2 className="sec-title mb-3 am-sec-title">
          AMENITIES FOR A PERFECT STAY
        </h2>

        {/* Section Subtitle */}
        <p className="booknow-description mb-md-5 mb-4 am-sec-subtitle">
          Equipped for long stays with all the comforts of home, including:
        </p>

        {/* Amenities Grid */}
        <div className="row g-3">
          {amenities.map((item, index) => (
            <div
              className="col-6 col-lg-2 col-md-3 col-sm-3"
              key={index}
            >
              <div className="am-card p-4 rounded-0">
                {/* Amenity Icon */}
                <img src={item.icon} alt={item.title} />

                {/* Amenity Title */}
                <h6 className="am-text mt-3">{item.title}</h6>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Amenities;
