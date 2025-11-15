import { Container, Row, Col } from "react-bootstrap";
import bedRoom from "/src/assets/images/bedroom.png";
import poolImg from "/src/assets/images/pool.png";
const BookNow: React.FC = () => {
  return (
    <section className="booknow-section py-5" id="booknow">
      <Container>
        <Row className="align-items-start">
          {/* ---------------------------------------------------
              LEFT COLUMN — TEXT + BUTTON
          --------------------------------------------------- */}
          <Col lg={6} md={12} className="booknow-left mb-4 mb-lg-0">
            <h2 className="sec-title mb-3 mx-md-0 mx-3">
              THE VILLA LA FONT EXPERIENCE
            </h2>

            <p className="booknow-description mb-4">
              Explore the villa’s signature features, from its spacious,
              charming interiors to its private, mountain-view pool.
            </p>

            {/* Book Now Button */}
            <button
              className="booknow-btn rounded-0"
              onClick={() =>
                window.open(
                  "https://checkout.lodgify.com/villastrias/en/#/506741"
                )
              }
            >
              BOOK NOW
            </button>
          </Col>

          {/* ---------------------------------------------------
              RIGHT COLUMN — EXPERIENCE CARDS
          --------------------------------------------------- */}
          <Col lg={6} md={12}>
            {/* Bedroom Experience Card */}
            <div className="experience-card mb-4">
              <img
                src={bedRoom}
                alt="Rustic bedroom interior"
                className="experience-img"
              />

              <div className="experience-content">
                <h5 className="experience-title">
                  Rustic Charm, Modern Comfort
                </h5>

                <p className="experience-text">
                  The house combines rustic character with modern conveniences.
                  Guests love the spacious, spotless rooms, comfy beds, and
                  strong air conditioning in all bedrooms. With 5 bedrooms and 5
                  baths, it’s perfect for groups.
                </p>
              </div>
            </div>

            {/* Pool Experience Card */}
            <div className="experience-card">
              <img
                src={poolImg}
                alt="Private outdoor pool"
                className="experience-img"
              />

              <div className="experience-content">
                <h5 className="experience-title">Your Private Outdoor Oasis</h5>

                <p className="experience-text">
                  The heart of Villa La Font is its stunning outdoor space.
                  Enjoy the private swimming pool (one of the few in the area),
                  relax in the garden, or host a family barbecue under the
                  roofed terrace. Set against the majestic Tramuntana mountains,
                  it’s the ultimate escape.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookNow;
